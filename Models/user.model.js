const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    dni: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    province: { type: String },
    birthDay: { type: String, required: true },
    roles: { type: String, required: true },
    // prefix: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    // profilePhoto: { type: [string] },
    fileUrlLink: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
