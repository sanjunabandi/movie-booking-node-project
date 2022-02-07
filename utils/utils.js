const {atob , btoa} = require("b2a");


const splitIntoFirstAndLastName = (artists) => {
    const artistSplitArray = artists.split(",");
        /*
            split aritsts array into first_name array and last_name array
        */
    let first_name = [];
        let last_name = [];
        for (let i = 0; i < artistSplitArray.length; i++) {
            let singleSplit = artistSplitArray[i].split(" ");
            first_name.push(singleSplit[0]);
            last_name.push(singleSplit[1]);
        }
        // Debuggin purpose
        // console.log("First name array: ", first_name);
        // console.log("Last name Array:  ", last_name);
        return {first_name, last_name};
}

const extractUsernameAndPassword = (authorization) => {
    
const authorizationArray = authorization.split(" ");
const userNamePasswordEncoded = authorizationArray[1];
const userNamePasswordDecoded = atob(userNamePasswordEncoded);
const userNamePasswordArray = userNamePasswordDecoded.split(":");
const username = userNamePasswordArray[0];
const password = userNamePasswordArray[1];

return {username, password};
} 

module.exports = {splitIntoFirstAndLastName, extractUsernameAndPassword};