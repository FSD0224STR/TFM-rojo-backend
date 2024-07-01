const { billModel} = require ("../Models/bill.model ")

const newBill = async (req, res) => {
  console.log(req.body);
  await billModel
    .create(req.body)
    .then((docInDb) => res.status(200).json(docInDb))
    .catch((err) => res.status(500).json(err));
};

const getBills = async (req, res) => {
  billModel
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

// const deleteBill= async (req, res) => {
//   // console.log(req.params.id);
//   await billDataModel
//     .findByIdAndDelete(req.params.id, req.body)
//     .then((data) => res.status(200).json({ msg: "Deleted", data: data }))
//     .catch((err) => res.status(500).json(err));
// };

// const changeStatusBill = async (req, res) => {
//   console.log(req.body);
// };

module.exports = {
  newBill,
  getBills,
 // deleteBill,
 // changeStatusBill,
};
