const { datesModel } = require("../Models/dates.model.js");

const newDate = async (req, res) => {
  console.log(req.body);
  await datesModel
    .create(req.body)
    .then((docInDb) => res.status(200).json(docInDb))
    .catch((err) => res.status(500).json(err));
};

const getDates = async (req, res) => {
  datesModel
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

const deleteDate = async (req, res) => {
  // console.log(req.params.id);
  await datesModel
    .findByIdAndDelete(req.params.id, req.body)
    .then((data) => res.status(200).json({ msg: "Deleted", data: data }))
    .catch((err) => res.status(500).json(err));
};

const changeStatusDate = async (req, res) => {
  // console.log(req.body);
  await datesModel
    .findByIdAndUpdate(req.body.id, {
      state: req.body.status,
      color: req.body.color,
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  newDate,
  getDates,
  deleteDate,
  changeStatusDate,
};
