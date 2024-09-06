const express = require("express");

const router = express.Router();
const publicControllers = require("../Controllers/public");
// GET / all products approved
router.get("/products", publicControllers.getAllProducts);

// POST / get Products by query
router.post("/products/filter", publicControllers.getProductsByQuery);

// GET / a particular product by id
router.get("/product/:id", publicControllers.getProduct);
module.exports = router;
