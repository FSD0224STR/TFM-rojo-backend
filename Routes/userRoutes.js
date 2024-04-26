const { Router } = require("express");
const { getUser, addUser, login } = require("../Controllers/userController.js");

const userRouter = Router();

userRouter.post("/newUser", addUser);
userRouter.post("/login", login);
userRouter.get("/getUser", getUser);

module.exports = { userRouter };
