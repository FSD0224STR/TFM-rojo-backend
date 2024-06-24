var cloudinary = require("cloudinary");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const cloudinaryImageLoad = async (image) => {
  //imgage = > base64
  // console.log(Image);
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
      // console.log(result);
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports.uploadImage = async (req, res) => {
  await cloudinaryImageLoad(req.body.base64)
    .then((data) => {
      console.log(data);
      res.status(200).json({ msg: "url" });
    })
    .catch((err) => res.status(500).send(err));
  // await cloudinary.uploader.upload(image, opts, (error, result) => {
  //   console.log(result);
  //   if (result && result.secure_url) {
  //     res.status(200).json({url: result.secure_url})
  //   }
  //   console.log(error.message);
  //   res.status(500).json({message: error.message});
  // });
};

// module.exports = {
//   uploadImage,
// };
