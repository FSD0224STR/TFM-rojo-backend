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

module.exports = {
  newDate,
  getDates,
};
