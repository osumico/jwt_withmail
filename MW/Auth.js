const APIError = require("../exceptions/APIError");
const TokenServ = require("../service/Token");
const config = require("config");


module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(APIError.AuthError());
        }

        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            return next(APIError.AuthError());
        }

        const data = TokenServ.validToken(accessToken, config.get("skeyAccess"));
        if (!data) {
            return next(APIError.AuthError());
        }

        req.user = data;
        next();

    } catch (e) {
        return next(APIError.AuthError());
    }
}