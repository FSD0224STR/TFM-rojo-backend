// Websocket server
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
app.use(cors());

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

server.listen(3333, () => {
  console.log("WEB SERVER listening on *:3333");
});
