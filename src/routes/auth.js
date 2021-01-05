const express = require("express");

const authRoute = express.Router();

const authController = require("../controllers/auth");

authRoute.post("/signUp", authController.createAuth);
authRoute.post("/signIn", authController.signAuth);

module.exports = authRoute;
