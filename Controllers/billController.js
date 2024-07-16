const { billModel } = require("../Models/bill.model ");

const newBill = async (req, res) => {
  // console.log(req.body);
  await billModel
    .create(req.body)
    .then((docInDb) => res.status(200).json(docInDb))
    .catch((err) => res.status(500).json(err));
};

const getBills = async (req, res) => {
  billModel
    .find()
    .populate("Patient")
    .then((data) => res.status(200).json({ data: data }))
    .catch((err) => res.status(500).json(err));
};


 const updateBill = async (req, res) => {
   // console.log("update:", req.body);
   await billModel
     .findByIdAndUpdate(req.body.id, { ...req.body })
     .then((data) => res.status(200).json({ msg: "success", data:data }))
     .catch((err) => res.status(500).json(err));
 
 };

 const searchedBill = async (req, res) => {
  console.log(req.body)
  await billModel
  .findById(req.body.id)    
  .populate("Patient")
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(500).json(err));

 }

module.exports = {
  newBill,
  getBills,
  // deleteBill,
  updateBill,
 searchedBill,
};
