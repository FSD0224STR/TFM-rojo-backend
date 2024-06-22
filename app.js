require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express(); //Instancia
app.use(cors(corsOptions));
const port = process.env.port || 3000; //Puerto donde va a funcionar

const { userRouter } = require("./Routes/userRoutes.js");
const { dateRouter } = require("./Routes/datesRoutes.js");

require("dotenv").config();

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_SERVER +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB).then(console.log("Connected to MongoDB"));
}
main().catch((err) => console.log(err));

app.use(express.json());

app.use("/user", userRouter);
app.use("/date", dateRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, server };
