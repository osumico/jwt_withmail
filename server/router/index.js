const { Router } = require("express");
const router = Router();


router.post("/reg");
router.post("/log");
router.post("/logout");

router.get("/activate/:link");
router.get("/refToken");
router.get("/users");


module.exports = router;