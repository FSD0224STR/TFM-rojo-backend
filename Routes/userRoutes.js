const { Router } = require("express");
const {
  getUser,
  addUser,
  login,
  verifyToken,
  uniqueUser,
} = require("../Controllers/userController.js");

const userRouter = Router();

userRouter.post("/newUser", uniqueUser, addUser);
userRouter.post("/login", login);
// userRouter.get("/getUser", verifyToken, getUser);

module.exports = { userRouter };
