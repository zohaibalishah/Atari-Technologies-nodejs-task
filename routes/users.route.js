const express = require("express");
const router = express.Router();
const {auth, isManager } = require("../helpers/middlewares");

const userController = require("../controllers/user");
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/",auth, isManager, userController.allUsers);

module.exports = router;
