const { Router } = require("express");
const {
  getUser,
  addUser,
  login,
  verifyToken,
} = require("../Controllers/userController.js");

const userRouter = Router();

userRouter.post("/newUser", addUser);
userRouter.post("/login", login);
userRouter.get("/getUser", verifyToken, getUser);

module.exports = { userRouter };
