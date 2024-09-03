const Product = require("../models/product");
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    console.log(products);
    if (products.length) {
      res.status(200).json({ isSuccess: true, products });
    } else {
      throw new Error("Something went wrong with getting products");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};
