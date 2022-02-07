module.exports = (mongoose) => {

    const coupenSchema = mongoose.Schema({
        id: {
            required: true,
            type: Number,
         },
        discountValue: {
            required: true,
            type: Number,
        }
    });

    const bookingRequestsSchema = mongoose.Schema({
        reference_number: {
            required: true,
            type: Number,
            
        },
        coupon_code: {
            required: false,
            type: Number,
            
        },
        show_id: {
            required: true,
            type: Number,
        },
        tickets: {
            type: [Number],
            required: true
        }
    });

    const userSchema = mongoose.Schema({
        userid: {
            type: Number,
            required: false,
            unique: true,
            dropDups: true
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
        coupens:{type: [coupenSchema], required: false},
        bookingRequests:{type: [bookingRequestsSchema], required: false}
    },
    {timeStamps: true}
    );

    const User = mongoose.model("user", userSchema);
    return User;
}