const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    province: { type: String },
    birthDay: { type: String },
    // roles: {
    //   type: [String],
    //   required: true,
    //   enum: ["user", "admin", "doctor"],
    // },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
