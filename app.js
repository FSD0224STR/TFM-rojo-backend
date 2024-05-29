require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express(); //Instancia
const port = 3000; //Puerto donde va a funcionar

require("dotenv").config();

const { userRouter } = require("./Routes/userRoutes");
const { dateRouter } = require("./Routes/datesRoutes");

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
app.use(cors());

app.use("/user", userRouter);
app.use("/date", dateRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, server };
