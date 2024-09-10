const Bid = require("../models/bid");

exports.createNewBit = async (req, res) => {
  try {
    const { message, phoneNumber, product_id, seller_id, buyer_id } = req.body;
    await Bid.create({
      message,
      phone_no: phoneNumber,
      product_id,
      seller_id,
      buyer_id,
    });
    res.status(201).json({ isSuccess: true, message: "Bid is created!" });
  } catch (error) {
    res
      .status(405)
      .json({ isSuccess: false, message: "Bid saving is not successful" });
  }
};
exports.getBidById = async (req, res) => {
  try {
    const { id } = req.params;

    const bids = await Bid.find({ product_id: id })
      .sort({ createdAt: -1 })
      .populate({ path: "buyer_id", select: "name" });

    if (!bids) {
      throw new Error("There is no bids for this product");
    }
    res.status(200).json({ isSuccess: true, message: "bids loaded", bids });
  } catch (error) {
    res
      .status(400)
      .json({ isSuccess: false, message: "Getting bids is not successful" });
  }
};
