var express = require("express");
var router = express.Router();
const user = require("../controller/UserController");
const auth = require("../middleware/auth");

/* GET users listing. */
router.get("/get-all", user.getAllUsers);

/* GET users listing. */
router.get("/get", auth.isLogin, user.getUser);

/* POST register user */
router.post("/sign-up", user.signup);

/* POST login user */
router.post("/sign-in", user.signin);

module.exports = router;