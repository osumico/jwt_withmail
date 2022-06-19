const { model, Schema } = require("mongoose");

const User = new Schema({
    email: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default: false },
    password: { type: String, required: true },
    emailLink: { type: String },
});

module.exports = model("User", User);