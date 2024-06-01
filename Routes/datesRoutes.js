const { Router } = require("express");

const { getDates, newDate } = require("../Controllers/datesController.js");

const dateRouter = Router();

dateRouter.post("/newDate", newDate);
dateRouter.get("/getDates", getDates);

module.exports = { dateRouter };
