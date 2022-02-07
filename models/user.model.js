module.exports = (mongoose) => {

    const coupenSchema = mongoose.Schema({
        id: {
            required: true,
            type: Number,
            unique: true
        },
        discountValue: {
            required: true,
            type: Number
        }
    });

    const bookingRequetsSchema = mongoose.Schema({
        reference_number: {
            required: true,
            type: Number,
            unique: true
        },
        coupon_code: {
            required: true,
            type: Number,
            unique: true
        },
        show_id: {
            required: true,
            type: Number,
        },
        tickets: {
            type: [Number],
            required: false
        }
    });

    const userSchema = mongoose.Schema({
        userid: {
            required: true,
            type: Number,
            unique: true
        },
        email: {
            required: true,
            type: String,
            unique: true,
            dropDups: true
        },
        first_name: {
            required: true,
            type: String
        },
        last_name: {
            required: true,
            type: String
        },
        username: {
            required: true,
            type: String
        },
        contact: {
            required: false,
            type: Number
        },
        password: {
            required: true,
            type: String
        },
        role: {
            required: true,
            type: String,
            default: "user"
        },
        isLoggedIn:  {
            required: true,
            type: Boolean,
            default: false
        },
        uuid: {
            required: false,
            type: String,
        },
        accesstoken: {
            required: false,
            type: String,
        },
        coupens: [coupenSchema],
        bookingRequets: [bookingRequetsSchema],

       

    },
    {timeStamps: true}
    );

    const User = mongoose.model("user", userSchema);
    return User;
}