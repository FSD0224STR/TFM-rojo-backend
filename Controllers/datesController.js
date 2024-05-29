const { datesModel } = require("../Models/dates.model.js");

const getDates = async (req, res) => {
  datesModel
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getDates,
};
