const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const adminControllers = require("../Controllers/admin");
const adminMiddleware = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth");
// getting all products of all users for admin panel
// GET/ admin/products
router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  adminControllers.getAllProducts
);
module.exports = router;
