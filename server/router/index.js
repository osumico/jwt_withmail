const { Router } = require("express");
const user = require("../controller/User")
const router = Router();
const { body } = require("express-validator");
const AuthMW = require("../MW/Auth");

router.post(
        "/reg", 
        body("email").isEmail(),
        body("password").isLength({min: 6}), // >=6
        user.register
);
            
router.post("/log", user.login);
router.post("/logout", user.logout);

router.get("/activate/:link", user.activate); // :link is schema
router.get("/refToken", user.refreshToken);
router.get("/users", AuthMW, user.getUsers);


module.exports = router;