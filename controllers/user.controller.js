const { user } = require("../models");
const db = require("../models");
const User = db.user;
const utils = require("../utils/utils");
const { fromString, isUuid } = require("uuidv4");
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator(); // Default is a 128-bit token encoded in base58

exports.login = (req, res) => {
    const authorization = req.headers["authorization"];
    console.log("Authorization header: ", authorization);
    const { username, password } = utils.extractUsernameAndPassword(authorization);
    console.log("username: ", username);
    console.log("password: ", password);
    const filter = { username: username };
    User.findOne(filter)
        .then(user => {
            if (user === null) {
                res.status(400).json({ message: "username or password is incorrect" });
            }
            else {
                console.log("Original user password is: ", user.password);
                if (password === user.password) {
                    let uuid = fromString(user.username);
                    console.log("uuid generated is: ", uuid);
                    let tokenGenerated = token.generate();
                    console.log("access-token genereated: ", tokenGenerated);
                    user.isLoggedIn = true;
                    user.uuid = uuid;
                    user.save();
                    res.status(200).json({
                        message: "logged in successfully",
                        ["access-token"]: tokenGenerated,
                        uuid: uuid
                    })
                }
                else {
                    res.status(400).json({ message: "Invalid Password" });
                }
            }
        })
        .catch(err => {
            console.log("Error in logging: ", err);
            res.status(500).json({ message: "Error in logging please try again" });
        })


}

exports.logout = (req, res) => {
    const { uuid } = req.body;
    console.log("uuid recieved for loging out", uuid);
    if (isUuid(uuid)) {
        User.findOne({ uuid: uuid })
            .then(user => {
                res.status(200).json({ message: "logged out successfully" });
                user.uuid = "";
                user.save();

            })
            .catch(err => {
                console.log("Error in logging out:", err);
                res.status(500).json({ message: "Error Logging Out" });
            })
    }
    else {
        res.status(500).json({ message: "Invalid uuid" });
    }
}



exports.signUp = async (req, res) => {
    let userCount = 0;

    userCount = await User.countDocuments();

    const { email_address, first_name, last_name, mobile_number, password } = req.body;
    console.log("Recieved data for signup: ", req.body);
    let filter = { email: email_address };
    console.log("filter object: ", filter);
    User.findOne(filter)
        .then((data) => {
            console.log("Data found: ", data);
            console.log("Entered then block")
            if (data !== null) {
                res.status(400).json({ message: "User already exists" });
            }
            else {
                let signUpData = {
                    email: email_address,
                    first_name: first_name,
                    last_name: last_name,
                    userid: userCount + 1,
                    username: first_name + " " + last_name,
                    contact: mobile_number,
                    password: password,
                };
                let newUser = new User(signUpData);
                newUser.save()
                    .then(data => {
                        res.status(200).json({ message: "Signed up successfully." });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: "Error in signing up" });
                    })
            }
        })
        .catch(error => {
            console.log("error in signing up: ", error);
            res.status(500).json({ message: "Error in signing up" });
        })

}
