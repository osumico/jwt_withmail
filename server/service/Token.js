const jwt = require("jsonwebtoken");
const config = require("config");
const TokenModel = require("../models/Token");


class Token {

    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("skeyAccess"), { 
            expiresIn: config.get("accessTTime")
        });
        const refToken = jwt.sign(payload, config.get("skeyRefresh"), { 
            expiresIn: config.get("refreshTTime")
        });

        return {
            accessToken: accessToken,
            refToken: refToken
        }

    }

    async save(id, refToken) {
        const tokenData = await TokenModel.findOne({ user: id });
        if (tokenData) {
            tokenData.refresh = refToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: id, refresh: refToken });
        return token;
    }
}

module.exports = new Token();