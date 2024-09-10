const { Schema, model } = require("mongoose");

const BidSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const bidModel = model("Bid", BidSchema);
module.exports = bidModel;
