const express = require("express");
const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

const app = express(); //Instancia
const port = 3000; //Puerto donde va a funcionar
// app.use(cors(corsOptions));
app.use(cors());
require("dotenv").config();

const { userRouter } = require("./Routes/userRoutes");
const { dateRouter } = require("./Routes/datesRoutes");
const { billRouter } = require("./Routes/billRoutes");

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
app.use("/bill", billRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, server };
