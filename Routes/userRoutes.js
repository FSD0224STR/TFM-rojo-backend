const { Router } = require("express");
const {
  getUser,
  addUser,
  login,
  verifyToken,
  uniqueUser,
  isAuthenticated,
  getMyUserInfo,
} = require("../Controllers/userController.js");

const userRouter = Router();

userRouter.post("/newUser", uniqueUser, addUser);
userRouter.post("/login", login);
userRouter.get("/getUsers", verifyToken, getUser);
// userRouter.get("/me", isAuthenticated, getMyUserInfo);
userRouter.get("/me", isAuthenticated);

module.exports = { userRouter };
