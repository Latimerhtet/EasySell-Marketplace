const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: "user",
    },
    usagePeriod: {
      type: String,
      required: true,
    },
    utilities: {
      type: Array,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const productModel = model("Product", productSchema);

module.exports = productModel;
