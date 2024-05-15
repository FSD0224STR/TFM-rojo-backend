const { Router } = require("express");
const {
  getUser,
  addUser,
  login,
  verifyToken,
  uniqueUser,
  isAuthenticated,
  getMyUserInfo,
  userExists,
  updatePassword,
  searchUser,
} = require("../Controllers/userController.js");

const userRouter = Router();

userRouter.post("/newUser", uniqueUser, addUser);
userRouter.post("/login", login);
userRouter.get("/getUsers", verifyToken, getUser);
userRouter.get("/me", isAuthenticated);
userRouter.put("/updatePassword", userExists, updatePassword);
userRouter.post("/searchUser", searchUser);
module.exports = { userRouter };
