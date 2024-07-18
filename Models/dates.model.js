const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const datesSchema = new Schema(
  {
    idPatient: { type: Schema.Types.ObjectId, ref: "User" },
    idDoctor: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: "string", required: true },
    time: { type: "string", required: true },
    timeFinish: { type: "string", required: true },
    duration: { type: "string", required: true },
    state: { type: "string", required: true },
    reason: { type: "string", required: true },
    color: { type: "string", required: true },
  },
  { timestamps: true }
);

const datesModel = mongoose.model("date", datesSchema);

module.exports = { datesModel };
