const { validationResult } = require("express-validator");
const Product = require("../models/product");
const SavedProducts = require("../models/SavedProducts");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: "due9ulwjn",
  api_key: "559454165396568",
  api_secret: process.env.CLOUD_API_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

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
    //https://res.cloudinary.com/due9ulwjn/image/upload/v1725256869/hdp9lrtwaombkrpar7wl.jpg
    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Can't delete the product!");
    }

    if (productDoc.images && Array.isArray(productDoc.images)) {
      const deletePromise = productDoc.images.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) {
              reject("Destory img on cloudinary failed");
            } else {
              resolve(result);
            }
          });
        });
      });

      await Promise.all(deletePromise);
    }

    const status = await Product.findByIdAndDelete({ _id: req.params.id });
    console.log(status);
    res
      .status(202)
      .json({ isSuccess: true, message: "Product deleted Successfully!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// uploading images to cloudinary
exports.upload = async (req, res, next) => {
  const productImages = req.files;
  const productId = req.body.product_id;
  const secureUrlArr = [];
  try {
    productImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if (!err) {
          const url = result.secure_url;
          secureUrlArr.push(url);

          if (productImages.length === secureUrlArr.length) {
            const response = await Product.findByIdAndUpdate(productId, {
              $push: { images: secureUrlArr },
            });
            res.status(200).json({
              isSuccess: true,
              message: "Product image Saved Successfully!",
            });
          }
        } else {
          throw new Error("Cloud image upload failed!");
        }
      });
    });
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

// getting images of a product
exports.getProductImages = async (req, res, next) => {
  const id = req.params.id;
  try {
    const productImages = await Product.findById(id).select("images");
    if (!productImages) {
      throw new Error("There is no images for this post!");
    } else {
      res.status(200).json({
        isSuccess: true,
        message: "Getting images from the cloud successful",
        data: productImages.images,
      });
    }
  } catch (error) {
    return res.status(422).json({ isSuccess: false, message: error.message });
  }
};

exports.deleteProductImages = async (req, res) => {
  try {
    const id = req.params.productId;
    const decodeImageToDelete = decodeURIComponent(req.params.imageToDelete);
    await Product.findByIdAndUpdate(id, {
      $pull: { images: decodeImageToDelete },
    });

    const publicId = decodeImageToDelete.substring(
      decodeImageToDelete.lastIndexOf("/") + 1,
      decodeImageToDelete.lastIndexOf(".")
    );
    await cloudinary.uploader.destroy(publicId);
    res.status(202).json({
      isSuccess: true,
      message: "Images deletion successful",
    });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// saving user's favourite product
exports.saveProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;

    const isExistedSavedProduct = await SavedProducts.findOne({
      $and: [{ user_id }, { product_id: id }],
    });

    if (isExistedSavedProduct) {
      throw new Error("You have already saved this item!");
    }
    await SavedProducts.create({ product_id: id, user_id });
    res.status(201).json({ isSuccess: true, message: " Product is saved!" });
  } catch (error) {
    return res.status(405).json({ isSuccess: false, message: error.message });
  }
};

// getting save products
exports.getSavedProducts = async (req, res) => {
  try {
    const user_id = req.userId;
    const productsDoc = await SavedProducts.find({ user_id })
      .populate({ path: "user_id", select: "name" })
      .populate({
        path: "product_id",
        select: "name description category price images",
      });
    if (!productsDoc) {
      throw new Error("There is no products saved!");
    }
    res.status(200).json({
      isSuccess: true,
      message: "Saved Products sent",
      products: productsDoc,
    });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

exports.unsaveProducts = async (req, res) => {
  try {
    const saveProductId = req.params.id;
    console.log(saveProductId);
    await SavedProducts.findByIdAndDelete({ _id: saveProductId });
    res
      .status(201)
      .json({ isSuccess: true, message: "Removed saved Product!" });
  } catch (error) {
    return res.status(404).json({ isSuccess: false, message: error.message });
  }
};
