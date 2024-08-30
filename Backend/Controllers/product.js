const { validationResult } = require("express-validator");
const Product = require("../models/product");
exports.addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ isSuccess: false, message: errors.array[0]?.msg });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_usage_period,
    product_utilities,
  } = req.body;
  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      price: product_price,
      category: product_category,
      usagePeriod: product_usage_period,
      utilities: product_utilities,
      seller: req.userId,
    });
    console.log(productDoc);
    res.status(201).json({
      isSuccess: true,
      message: "Product is added successfully",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};
// edit product
exports.editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ isSuccess: false, message: errors.array[0]?.msg });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_usage_period,
    product_utilities,
    seller_id,
    product_id,
  } = req.body;
  try {
    if (req.userId.toString() !== seller_id) {
      throw new Error("Can't update the product!");
    }
    const productDoc = await Product.findOne({ _id: product_id });

    (productDoc.name = product_name),
      (productDoc.description = product_description),
      (productDoc.price = product_price),
      (productDoc.category = product_category),
      (productDoc.utilities = product_utilities),
      (productDoc.usagePeriod = product_usage_period),
      productDoc.save();
    res.status(200).json({
      isSuccess: true,
      message: "Product is updated successfully",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};
// getting all products
exports.getAllproducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });
    if (products.length) {
      res.status(200).json({ isSuccess: true, products });
    } else {
      throw new Error("Something went wrong with getting products");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

// getting old product
exports.getOldProduct = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const product = await Product.findOne({ _id: req.params.id });
    console.log(product);
    if (product) {
      res.status(200).json({ isSuccess: true, product });
    } else {
      throw new Error("Something went wrong with getting products");
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    console.log(req.userId);
    const productDoc = await Product.findOne({ _id: req.params.id });
    console.log(productDoc);
    console.log(productDoc.seller);

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Can't delete the product!");
    }
    const status = await Product.findByIdAndDelete({ _id: req.params.id });
    console.log(status);
    res
      .status(202)
      .json({ isSuccess: true, message: "Product deleted Successfully!" });
  } catch (error) {
    return res.status(202).json({ isSuccess: false, message: error.message });
  }
};
