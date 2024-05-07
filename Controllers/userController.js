const { userModel } = require("../Models/user.model.js");

// Libreria para encriptar contraseña
const bcrypt = require("bcryptjs");

// Libreria para generar token
const jwt = require("jsonwebtoken");

const tokenSecret = process.env.MYTOKENSECRET;

const uniqueUser = async (req, res, next) => {
  await userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log("user", req.body.email);
      console.log("found", user.email);
      res.status(409).json({ msg: "User already exists" });
    })
    .catch(() => {
      next();
      // res.status(200).json({ msg: "User does not exist" });
    });
};

const addUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(hashedPassword);
  await userModel
    .create({
      ...req.body,
      password: hashedPassword,
    })
    .then((docInDb) => {
      // console.log(req.body);
      res.status(200).json(docInDb);
    })
    .catch((err) => {
      // console.log(err.code);
      if (err.code === 11000) {
        res.status(409).json({ msg: "User already exists" });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const login = async (req, res) => {
  // console.log(req.body);
  await userModel
    .findOne({ email: req.body.email })
    .then(async (user) => {
      const passwordCompere = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordCompere) {
        // Ahora se genera un token para dar acceso al resto de llamadas
        const token = jwt.sign(
          {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
          },
          tokenSecret,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ msg: "Login successful", token: token });
      } else {
        res.status(403).json({ msg: "Forbidden" });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "User not found" });
    });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log("Este es el token", token);
  try {
    const decodeToken = jwt.verify(token, tokenSecret);
    // console.log("Decoded token", decodeToken);
    next();
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
  // if (decodeToken) return next();
  // res.status(403).json({ msg: "Forbidden" });
};

const getUser = async (req, res) => {
  userModel.find().then((data) => res.status(200).json(data));
};

module.exports = {
  addUser,
  getUser,
  login,
  verifyToken,
  uniqueUser,
};
