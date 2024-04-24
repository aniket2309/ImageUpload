const mongoose = require("mongoose")
const userType = require("../enums/userType");
const status =  require("../enums/status");
const bcrypt = require ("bcryptjs")

var userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        Password: {
            type: String,
        },
        image: {
            type: String,
        },
        userType: {
            type: String,
            default: userType.USER
        },
        status: {
            type: String,
            default: status.ACTIVE
        },
    },
    { timestamps: true }
);

const userInfo = mongoose.model("new", userSchema);
module.exports = userInfo;


