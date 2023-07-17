const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        fullName: String,
        userName: String, 
        email: String,
        password: String,
    },
    { timestamps: true }
);

module.exports = model('User', userSchema);