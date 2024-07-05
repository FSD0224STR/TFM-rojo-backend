const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
  },
  { timestamps: true }
);

const imagesModel = mongoose.model("image", imagesSchema);

module.exports = { imagesModel };