const express = require("express");

const userRoute = express.Router();
const checkAuth = require("../middleware/checkAuth");

const userController = require("../controllers/user");

userRoute.post("/createUser", checkAuth, userController.createUser);
userRoute.get("/getUsers", userController.getUsers);
userRoute.get("/getUser/:id", userController.getUser);
userRoute.put("/edit-user/:id", checkAuth, userController.updateUser);
userRoute.delete("/deleteUser/:id", checkAuth, userController.deleteUser);

module.exports = userRoute;
