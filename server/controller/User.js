const UserSrv = require("../service/User");
const config = require("config");

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
class User {


    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await UserSrv.registration(email, password);

            res.cookie('refToken', data.refToken, { 
                maxAge: stringToMsJWT(config.get("refreshTTime")),
                httpOnly: true
            });
            return res.json(data);


        } catch (e) {
            console.error(e);
        }
    }


    async login(req, res, next) {
        try {
            res.json("log");

        } catch (e) {
            console.error(e);
        }
    }


    async logout(req, res, next) {
        try {
            res.json("logout");

        } catch (e) {
            console.error(e);
        }
    }


    async activate(req, res, next) {
        try {
            res.json("activate");

        } catch (e) {
            console.error(e);
        }
    }


    async refreshToken(req, res, next) {
        try {
            res.json("ref");

        } catch (e) {
            console.error(e);
        }
    }


    async getUsers(req, res, next) {
        try {
            res.json("users");

        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new User();