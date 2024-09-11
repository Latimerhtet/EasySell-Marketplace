const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const productControllers = require("../Controllers/product");
const bidControllers = require("../Controllers/bid");
const notificationControllers = require("../Controllers/notification");
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

// GET / getting saved products
router.get(
  "/getSavedProducts",
  authMiddleware,
  productControllers.getSavedProducts
);

// DELETE / remove save product
router.delete(
  "/unsave-product/:id",
  authMiddleware,
  productControllers.unsaveProducts
);

// create bid // POST
router.post(
  "/createBid",
  [
    body("message").trim().notEmpty().withMessage("Message is empty"),
    body("phoneNumber").trim().notEmpty().withMessage("Phone number is empty"),
  ],
  authMiddleware,
  bidControllers.createNewBit
);

//  get bids by product Id
router.get("/bid/:id", authMiddleware, bidControllers.getBidById);

// push notification
router.post(
  "/notify",
  authMiddleware,
  notificationControllers.pushNotification
);

router.get(
  "/notifications",
  authMiddleware,
  notificationControllers.getNotificaions
);

// DELETE not
router.delete(
  "/deleteNoti/:id",
  authMiddleware,
  notificationControllers.deleteNotification
);

// DELETE ALL
router.delete(
  "/deleteAllNotis/:id",
  authMiddleware,
  notificationControllers.deleteAllNotifications
);

router.post(
  "/markAsRead/:id",
  authMiddleware,
  notificationControllers.markAsRead
);
module.exports = router;
