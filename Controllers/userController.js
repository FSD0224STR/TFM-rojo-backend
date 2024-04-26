const { userModel } = require("../models/user.model.js");

const addUser = async (req, res) => {
  await userModel
    .create(req.body)
    .then((docInDb) => {
      res.status(200).json(docInDb);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const login = async (req, res) => {
  await userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user.password === req.body.password) {
        res.status(200).json({ msg: "Login successful" });
      } else {
        res.status(403).json({ msg: "Forbidden", id: `${user._id}` });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "User not found" });
    });
};

const getUser = async (req, res) => {
  console.log(req.params);
};

module.exports = {
  addUser,
  getUser,
  login,
};
