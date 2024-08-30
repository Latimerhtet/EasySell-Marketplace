const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authControllers = require("../Controllers/auth");
const authMiddleware = require("../middlewares/auth");
// creating new user
// POST /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name must be at least 3 characters")
      .isLength({ min: 3 })
      .withMessage("Name must have three characters!"),
    body("email").isEmail().withMessage("Invalid email!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Name must be at least 3 characters")
      .isLength({ min: 5 })
      .withMessage("Name must have three characters!"),
  ],
  authControllers.register
);

// logging in
// POST /login
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Name must be at least 3 characters")
      .isLength({ min: 3 })
      .withMessage("Name must have three characters!"),
    body("email").trim().isEmail().withMessage("Invalid email!"),
  ],
  authControllers.login
);

router.get("/status", authMiddleware, authControllers.checkUserAuth);
module.exports = router;
