const mongoose = require("mongoose");

const datesSchema = new mongoose.Schema(
  {
    idPatient: { type: "string", required: true },
    idDoctor: { type: "string", required: true },
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
