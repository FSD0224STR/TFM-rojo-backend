const { Router } = require("express");
const { uploadImages } = require("../Controllers/loadImagesController.js");
const multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now());
  },
});
var upload = multer({ storage: storage });

const imagesRouter = Router();

// imagesRouter.post("/upload", upload.single("image"), uploadImages);
// var upload = multer({ dest: 'upload/'});
var type = upload.single("file");

imagesRouter.post("/upload", type, function (req, res) {
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
module.exports = { imagesRouter };
