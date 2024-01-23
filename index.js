require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./src/routes/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRoutes);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(9000, () => {
      console.log("Connection Success");
    });
  })
  .catch((err) => console.log(err.message));
