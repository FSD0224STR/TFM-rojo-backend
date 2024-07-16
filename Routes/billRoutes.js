const { Router } = require("express");

const {
        newBill,
        getBills,
    //    deleteBill,
        updateBill,
        searchedBill,
      
} = require("../Controllers/billController");

const billRouter = Router();

billRouter.post("/newBill", newBill);
billRouter.get("/getBill", getBills);
// billRouter.delete("/deleteBill/:id", deleteBill);
billRouter.put("/updateBill", updateBill);
billRouter.post("/searchBill", searchedBill);


module.exports = { billRouter };