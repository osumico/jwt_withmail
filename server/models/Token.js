const {model, Schema} = require("mongoose");

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refresh: {type: String, required: true},
});

module.exports = model("Token", Token);