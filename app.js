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

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

const mongoose = require("mongoose");
const { imagesRouter } = require("./Routes/loadImagesRoutes");
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
// app.use("/images", imagesRouter);

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se han enviado archivos");
  }

  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }

    // Puedo hacer la inserción de toda la info del usuario incluyendo la URL de su imagen de perfil

    // Mostramos la info de Cloudinary
    console.log("El contenido de result es", result);
    console.log("La URL donde se ha guardado la imagen es:", result.url);

    res.status(200).send(result.url);
  });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, server };
