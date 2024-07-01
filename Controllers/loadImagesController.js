const { imagesModel } = require("../Models/loadImages.model.js");
const path = require("path");

const uploadImages = async (req, res) => {
  console.log(req.body);
  res.status(200).send("hola");
  //     var obj = {
  //         name: req.body.name,
  //         desc: req.body.desc,
  //         img: {
  //             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //             contentType: 'image/png'
  //         }
  //     }
  //  imagesModel.create(obj)
  //     if (!req.file) {
  //       return res.status(400).send("No se han enviado archivos");
  //     }

  //     cloudinary.uploader.upload(req.file.path, (error, result) => {
  //       if (error) {
  //         return res.status(500).send(error);
  //       }

  //       // Puedo hacer la inserción de toda la info del usuario incluyendo la URL de su imagen de perfil

  //       // Mostramos la info de Cloudinary
  //       console.log("El contenido de result es", result);
  //       console.log("La URL donde se ha guardado la imagen es:", result.url);

  //       res.status(200).send(result.url);
  //     });
};

module.exports = {
  uploadImages,
};
