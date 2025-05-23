const { userModel } = require("../Models/user.model.js");

// Libreria para encriptar contraseña
const bcrypt = require("bcryptjs");

// Libreria para generar token
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");

const tokenSecret = process.env.MYTOKENSECRET;
const emailapppass = process.env.EMAILAPPPASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "molarisapp@gmail.com",
    pass: emailapppass,
  },
});

const uniqueUser = async (req, res, next) => {
  console.log(req.body.email);
  await userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log("user", req.body.email);
      console.log("found", user.email);
      res.status(409).json({ msg: "User already exists BD" });
    })
    .catch(() => {
      next();
      // res.status(200).json({ msg: "User does not exist" });
    });
};

const sendWelcomeEmail = async (req, res, next) => {
  const email = {
    from: "molarisapp@gmail.com",
    to: docInDb.email,
    subject: "Bienvenido a Molaris",
    text: `Hola ${docInDb.name}, bienvenido a Molaris.`,
  };
  transporter.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      next();
    }
  });
};

const addUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(
    req?.body?.password ? req?.body?.password : "",
    10
  );

  await userModel
    .create({
      ...req.body,
      password: req.body?.password !== undefined ? hashedPassword : "",
    })
    .then((docInDb) => {
      res.status(200).json(docInDb);
    })

    .catch((err) => {
      if (err.code === 11000) {
        console.log("User already exists E11000");
        res.status(409).json({ msg: "User already exists E11000" });
      } else {
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
            name: user.name + " " + user.lastName,
            email: user.email,
            role: user.roles,
          },
          tokenSecret
          // {
          //   expiresIn: "24h",
          // }
        );
        res.status(200).json(token);
      } else {
        res.status(403).json({ msg: "Forbidden" });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "User not found" });
    });
};

const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  var token = req.headers.authorization?.split(" ")[1];
  // console.log(token);

  try {
    const decodeToken = jwt.verify(token, tokenSecret);
    next();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getUser = async (req, res) => {
  userModel
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

const isAuthenticated = (req, res, next) => {
  // console.log(req.headers.authorization);
  var token = req.headers.authorization?.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, tokenSecret);
    res.status(200).json(decodedToken);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getMyUserInfo = async (req, res) => {
  const userFound = await userModel.findById(req.user.id);
  const modifiedUser = {
    ...userFound._doc,
    password: "Esto no se puede mostrar",
  };
  // console.log(modifiedUser);
  res.status(200).json(modifiedUser);
  next();
};

const sendEmailToUserFromAdmin = async (req, res) => {
  // console.log(emailapppass);
  const email = {
    from: "molarisapp@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };
  transporter.sendMail(email, function (err, info) {
    if (err) {
      // console.log(err);
      res.status(500).json(err);
    } else {
      // console.log("Email sent: " + info.response);
      res.status(200).json({ msg: "Email sent" });
    }
    return res.end();
  });
};

const userExists = async (req, res, next) => {
  const userEmail = req.body.user.email;
  await userModel
    .findOne({ email: userEmail })
    .then(async (user) => {
      // console.log("user", user);
      const passwordCompere = await bcrypt.compare(
        req.body.user.oldPassword,
        user.password
      );
      if (passwordCompere) {
        // Ahora se genera un token para dar acceso al resto de llamadas
        next();
      } else {
        res.status(403).json({ msg: "wrong old password" });
      }
    })
    .catch(() => {
      res.status(404).json({ msg: "User not found" });
    });
};

const updatePassword = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.user.newPassword, 10);
  // console.log(hashedPassword);
  await userModel
    .findOneAndUpdate(
      { email: req.body.user.email },
      { password: hashedPassword }
    )
    .then(() => {
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const searchUser = async (req, res) => {
  // console.log(req.body.id);
  await userModel
    .findById(req.body.id)
    .then(async (user) => {
      // const userSearched = user;
      user.password = "";
      // console.log(user);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const updateUser = async (req, res) => {
  // console.log("update:", req.body);
  await userModel
    .findByIdAndUpdate(req.body.userId, { ...req.body })
    .then(res.status(200).json({ msg: "success" }))
    .catch((err) => {
      res.status(500).json(err);
    });
  //   .findOneByIdAndUpdate(req.body._id, { ...req.body })
  //   .then(() => {
  //     res.status(200).json({ msg: "success" });
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
};

module.exports = {
  addUser,
  getUser,
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
};
