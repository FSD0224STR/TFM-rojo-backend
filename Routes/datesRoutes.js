const { Router } = require("express");

const { getDates } = require("../Controllers/datesController.js");

const dateRouter = Router();

dateRouter.get("/getDates", getDates);

module.exports = { dateRouter };
