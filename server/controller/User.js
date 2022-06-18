class User {


    async register(req, res, next) {
        try {
            res.json("reg");

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