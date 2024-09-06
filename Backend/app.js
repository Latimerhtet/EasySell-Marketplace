const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
// importing routes
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");
const adminRoutes = require("./Routes/admin");
const publicRoutes = require("./Routes/public");
const app = express();
const dotenv = require("dotenv").config();

const storageConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.filename);
  },
});

const fileFilterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(
  multer({ storage: storageConfig, fileFilter: fileFilterConfig }).array(
    "product_images"
  )
);
// authRoutes
app.use(authRoutes);
app.use(productRoutes);
app.use("/admin", adminRoutes);
app.use("/api", publicRoutes);
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
