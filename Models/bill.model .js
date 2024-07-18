const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let treatmentSchema = new Schema({
  price: { type: "Number" },
  iva: { type: "Number" },
  qty: { type: "Number" },
  total: { type: "Number" },
  treatment: { type: "string" },
});
const billSchema = new Schema(
  {
    billNumber: { type: "number", required: false },
    Patient: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: "string", required: false },
    description: { type: "string", required: false },
    treatments: [treatmentSchema],
    totalSum: { type: "string", required: false },
    status: { type: "string", required: false },
  },
  { timestamps: true }
);

const billModel = mongoose.model("bill", billSchema);

module.exports = { billModel };
