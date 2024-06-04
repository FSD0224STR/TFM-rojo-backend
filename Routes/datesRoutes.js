const { Router } = require("express");

const {
  getDates,
  newDate,
  deleteDate,
  changeStatusDate,
} = require("../Controllers/datesController.js");

const dateRouter = Router();

dateRouter.post("/newDate", newDate);
dateRouter.get("/getDates", getDates);
dateRouter.delete("/deletedate/:id", deleteDate);
dateRouter.put("/changeStatus/", changeStatusDate);

module.exports = { dateRouter };
