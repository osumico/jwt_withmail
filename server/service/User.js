const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const MainServ = require("./Mail");
const TokenServ = require("./Token");
const UserDTO = require("../dtos/User");
const config = require("config");

class User {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`User with ${ email } -- is exist!`);
        }

        const hashPass = await bcrypt.hashSync(password, bcrypt.genSaltSync(6));
        const emailLink = uuid.v4();
        const user = await UserModel.create({ 
            email: email,
            password: hashPass,
            emailLink: emailLink
        });

        const doneLink = `http://${config.get("domain")}:${config.get("port")}/api/activate/${emailLink}`;
        await MainServ.sendActivationEmail({ email, doneLink});
        
        const UserDto = new UserDTO(user);
        const tokens = TokenServ.generate({...UserDto});
        await TokenServ.save(UserDto.id, tokens.refToken);

        return {
            ...tokens,
            user: UserDto
        }
    }
}

module.exports = new User();