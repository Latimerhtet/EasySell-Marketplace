const Product = require("../models/product");
const User = require("../models/user");
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    if (products.length) {
      res.status(200).json({ isSuccess: true, products });
    } else {
      throw new Error("Something went wrong with getting products");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

exports.setProductStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const productDoc = await Product.findById(id);
    if (productDoc) {
      productDoc.status = status;
      await productDoc.save();

      return res
        .status(200)
        .json({ isSuccess: true, message: `Product is ${status}` });
    } else {
      throw new Error("Something went wrong with setting status!");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const usersDoc = await User.find()
      .select("name email role createdAt status")
      .sort({ createdAt: -1 });
    if (usersDoc) {
      res.status(200).json({ isSuccess: true, users: usersDoc });
    } else {
      throw new Error("Users Data cannot fetch from database!");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

exports.setUserStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const userDoc = await User.findById(id);
    if (!userDoc) {
      throw new Error("Something went wrong!");
    } else {
      userDoc.status = status;
      await userDoc.save();
      res
        .status(200)
        .json({ isSuccess: true, message: `${userDoc.name} is ${status}!` });
    }
  } catch (error) {}
};
