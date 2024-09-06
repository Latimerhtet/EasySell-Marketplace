const { Schema, model } = require("mongoose");

const SavedProducts = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const SavedProductsModel = model("SavedProducts", SavedProducts);
module.exports = SavedProductsModel;
