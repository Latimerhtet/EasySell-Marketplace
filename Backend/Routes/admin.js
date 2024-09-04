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
// POST /setStatus
router.post(
  "/setStatus/:id",
  authMiddleware,
  adminMiddleware,
  adminControllers.setProductStatus
);
// GET / users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminControllers.getAllUsers
);

// POST /setUserStatus
router.post(
  "/setUserStatus/:id",
  authMiddleware,
  adminMiddleware,
  adminControllers.setUserStatus
);
module.exports = router;
