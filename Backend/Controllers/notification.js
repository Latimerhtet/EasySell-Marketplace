const Notification = require("../models/notifications");
exports.pushNotification = async (req, res) => {
  const { title, message, owner_id, product_id, phone_number } = req.body;
  try {
    await Notification.create({
      title,
      message,
      owner_id,
      product_id,
      phone_number,
    });
    return res
      .status(201)
      .json({ isSuccess: true, message: "Notification created!" });
  } catch (error) {
    return res
      .status(422)
      .json({ isSuccess: false, message: "Error creating Notification!" });
  }
};

exports.getNotificaions = async (req, res) => {
  try {
    const notiDocs = await Notification.find({ owner_id: req.userId }).sort({
      createdAt: -1,
    });
    if (!notiDocs) {
      throw new Error("Error getting user's notificaitons");
    }
    res.status(200).json({ isSuccess: true, notifications: notiDocs });
  } catch (error) {
    return res
      .status(422)
      .json({ isSuccess: false, message: "Error creating Notification!" });
  }
};
