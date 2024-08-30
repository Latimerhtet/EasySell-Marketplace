const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// importing routes
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");
const app = express();
const dotenv = require("dotenv").config();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// authRoutes
app.use(authRoutes);
app.use(productRoutes);

// connecting to database and running server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(8000, () => {
      console.log("Serve is running at port 8000 and connected to database! ");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });
