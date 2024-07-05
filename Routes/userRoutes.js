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
  updateUser,
  sendEmailToUserFromAdmin,
} = require("../Controllers/userController.js");

const { uploadImage } = require("../Controllers/ImageController.js");

const userRouter = Router();

userRouter.post("/newUser", uniqueUser, addUser);
userRouter.post("/login", login);
userRouter.get("/getUsers", verifyToken, getUser);
userRouter.get("/me", isAuthenticated);
userRouter.put("/updatePassword", userExists, updatePassword);
userRouter.post("/searchUser", searchUser);
userRouter.put("/updateUser", updateUser);
userRouter.post("/uploadImage", uploadImage);
userRouter.post("/sendEmail", sendEmailToUserFromAdmin);

module.exports = { userRouter };