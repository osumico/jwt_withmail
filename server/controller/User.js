const UserSrv = require("../service/User");
const config = require("config");
const { validationResult } = require("express-validator");
const APIError = require("../exceptions/APIError");

function stringToMsJWT(string) {
    const ints = string.slice(0, 2);
    const multStr = string.slice(2, 3);
    let mult = 0;
  
    switch (multStr) {
      case "m":
        mult = 60;
        break;
  
      case "h":
        mult = 60 * 60;
        break;
  
      case "d":
        mult = 60 * 60 * 24;
        break;
  
      default:
        mult = 0;
        break;
    }
  
    return ints * mult * 1000;
  }


function cookieSet(res, data) {
    res.cookie('refToken', data.refToken, { 
        maxAge: stringToMsJWT(config.get("refreshTTime")),
        httpOnly: true
    });
}


class User {


    async register(req, res, next) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(APIError.BadRequest("Validation error", errors.array()))
            }

            const { email, password } = req.body;
            const data = await UserSrv.registration(email, password);
            cookieSet(res, data);

            return res.json(data);

        } catch (e) {
            next(e);
        }
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await UserSrv.login(email, password);
            cookieSet(res, data);

            return res.json(data);

        } catch (e) {
            next(e);
        }
    }


    async logout(req, res, next) {
        try {
            const { refToken } = req.cookies;
            const token = await UserSrv.logout(refToken);
            res.clearCookie("refToken");

            return res.json(token);
            
        } catch (e) {
            next(e);
        }
    }


    async activate(req, res, next) {
        try {
            const emailLink = req.params.link;
            await UserSrv.activate(emailLink);

            const clientURL = `http://${ config.get("domain") }:${ config.get("clientPort") }`;
            return res.redirect(clientURL);

        } catch (e) {
            next(e);
        }
    }


    async refreshToken(req, res, next) {
        try {
            res.json("ref");

        } catch (e) {
            next(e);
        }
    }


    async getUsers(req, res, next) {
        try {
            res.json("users");

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new User();