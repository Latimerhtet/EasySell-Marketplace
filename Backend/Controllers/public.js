const Product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ status: "approved" })
      .populate("seller", "name")
      .sort({
        createdAt: -1,
      });
    if (!products) {
      throw new Error("Something went wrong with getting products!");
    }
    res.status(200).json({ isSuccess: true, products });
  } catch (error) {
    res.status(422).json({ isSuccess: false, message: "Something went wrong" });
  }
};

exports.getProductsByQuery = async (req, res) => {
  try {
    const { searchKey, category } = req.query;
    const searchQuery = {};
    if (searchKey) {
      searchQuery.name = { $regex: searchKey, $options: "i" };
    }
    if (category) {
      searchQuery.category = { $regex: category, $options: "i" };
    }
    const products = await Product.find(searchQuery).populate("seller", "name");
    if (!products) {
      throw new Error("Error fetching products!");
    }
    res.status(200).json({ isSuccess: true, products });
  } catch (error) {
    res.status(422).json({ isSuccess: false, message: "Can't fetch posts" });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("seller", "name email");
    if (!product) {
      throw new Error("Product is not found!");
    }
    res.status(200).json({ isSuccess: true, product });
  } catch (error) {
    res.status(404).json({ isSuccess: false, message: error.message });
  }
};
