const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mail = require("./Mail");

class User {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`User with ${ email } -- is exist!`);
        }

        const hashPass = await bcrypt.hashSync(bcrypt, bcrypt.genSaltSync(6));
        const emailLink = uuid.v4();
        const user = await UserModel.create({ 
            email: email,
            password: hashPass,
            emailLink: emailLink
        });
    }
}

module.exports = new User();