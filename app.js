require("dotenv").config();

const express = require("express");
const cloudinary = require("cloudinary");
const cors = require("cors");
const multer = require("multer");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express(); //Instancia
app.use(cors(corsOptions));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
const port = process.env.port || 3000; //Puerto donde va a funcionar

const { userRouter } = require("./Routes/userRoutes.js");
const { dateRouter } = require("./Routes/datesRoutes.js");
const { billRouter } = require("./Routes/billRoutes");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_SERVER +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB).then(console.log("Connected to MongoDB"));
}
main().catch((err) => console.log(err));

app.use(express.json());

app.use("/user", userRouter);
app.use("/date", dateRouter);
app.use("/bill", billRouter);
// app.use("/images", imagesRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Websockets

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //detección de conexión
  console.log("a user connected");
  io.emit("userConnection", { msg: "Un usuario se ha conectado" });
  // detección de desconexión
  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("userConnection", { msg: "Un usuario se ha desconectado" });
  });
  //detección de nuevo evento
  socket.on("login", (user) => {
    console.log(user);
    io.emit("message", "Hola" + user.id);
  });

  socket.on("msg", (msg) => {
    console.log(msg);
    console.log(
      "He recibido un nuevo mensaje de ",
      msg.nickname,
      "que dice: ",
      msg.msg
    );
    io.emit("msg", msg);
  });

  socket.on("status", (status) => {
    console.log("status", status);
    io.emit("status", status);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Websockets!</h1>");
});

module.exports = { app, server };
