const { Router } = require("express");
const user = require("../controller/User")
const router = Router();
const { body } = require("express-validator");

router.post("/reg", 
                    body("email").isEmail(),
                    body("password").isLength({min: 5}),
            user.register);
            
router.post("/log", user.login);
router.post("/logout", user.logout);

router.get("/activate/:link", user.activate);
router.get("/refToken", user.refreshToken);
router.get("/users", user.getUsers);


module.exports = router;