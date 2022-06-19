const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const MainServ = require("./Mail");
const TokenServ = require("./Token");
const UserDTO = require("../dtos/User");
const config = require("config");
const APIError = require("../exceptions/APIError");

class User {


    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw APIError.BadRequest(`User with ${ email } -- is exist!`);
        }

        const hashPass = await bcrypt.hashSync(password, bcrypt.genSaltSync(6));
        const emailLink = uuid.v4();
        const user = await UserModel.create({ 
            email: email,
            password: hashPass,
            emailLink: emailLink
        });


        const doneLink = `http://${ config.get("domain") }:${ config.get("port") }/api/activate/${ emailLink }`;
        await MainServ.sendActivationEmail(email, doneLink);
        
        const UserDto = new UserDTO(user);
        const tokens = TokenServ.generate({ ...UserDto });
        await TokenServ.save(UserDto.id, tokens.refToken);

        return {
            ...tokens,
            user: UserDto
        }
    }


    async activate(emailLink) {
        const user = await UserModel.findOne({ emailLink });
        if (!user) {
            throw APIError.BadRequest("Uncorrect activate link")
        }

        user.isActive = true;
        await user.save();


    }
}

module.exports = new User();