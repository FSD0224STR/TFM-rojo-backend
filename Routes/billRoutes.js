const { Router } = require("express");

const {
        newBill,
        getBills,
    //    deleteBill,
    //    changeStatusBill,
      
} = require("../Controllers/billController");

const billRouter = Router();

billRouter.post("/newBill", newBill);
billRouter.get("/getBill", getBills);
// billRouter.delete("/deleteBill/:id", deleteBill);
// billRouter.put("/changeStatus/", changeStatusBill);

module.exports = { billRouter };