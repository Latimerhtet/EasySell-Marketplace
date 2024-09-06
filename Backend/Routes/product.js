const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const productControllers = require("../Controllers/product");

// POST / Add product
router.post(
  "/addProduct",
  authMiddleware,
  [
    body("product_name").trim().notEmpty().withMessage("Name is empty"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Description is empty"),
    body("product_price").trim().notEmpty().withMessage("Price is empty"),
    body("product_category").trim().notEmpty().withMessage("Category is empty"),
    body("product_usage_period")
      .trim()
      .notEmpty()
      .withMessage("period is empty"),
    body("product_utilities").isArray().withMessage("utilities is empty"),
  ],
  productControllers.addProduct
);

// GET /products
// getting all products of a particular seller
router.get("/products", authMiddleware, productControllers.getAllproducts);

// GET /product/:id
router.get("/product/:id", authMiddleware, productControllers.getOldProduct);

// update product
// POST /updateProduct/:id
router.post(
  "/updateProduct",
  authMiddleware,
  [
    body("product_name").trim().notEmpty().withMessage("Name is empty"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Description is empty"),
    body("product_price").trim().notEmpty().withMessage("Price is empty"),
    body("product_category").trim().notEmpty().withMessage("Category is empty"),
    body("product_usage_period")
      .trim()
      .notEmpty()
      .withMessage("period is empty"),
    body("product_utilities").isArray().withMessage("utilities is empty"),
  ],

  productControllers.editProduct
);

// DELETE/
router.delete(
  "/deleteProduct/:id",
  authMiddleware,
  productControllers.deleteProduct
);

router.post("/upload", authMiddleware, productControllers.upload);

// GET/ get product images
router.get(
  "/productImages/:id",
  authMiddleware,
  productControllers.getProductImages
);

// deleting product image
router.delete(
  "/productImages/destory/:productId/:imageToDelete",
  authMiddleware,
  productControllers.deleteProductImages
);

// POST / saving favourite product of a user
router.post(
  "/save-product/:id",
  authMiddleware,
  productControllers.saveProducts
);

router.get(
  "/getSavedProducts",
  authMiddleware,
  productControllers.getSavedProducts
);
module.exports = router;
