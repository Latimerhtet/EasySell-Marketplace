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

exports.deleteNotification = async (req, res) => {
  try {
    // this is the notification id
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(201).json({ isSuccess: true, message: "Deletion Successful!" });
  } catch (error) {
    res
      .status(406)
      .json({ isSuccess: false, message: "Error deleting notification!" });
  }
};

exports.deleteAllNotifications = async (req, res) => {
  try {
    // this is the owner id
    const { id } = req.params;
    console.log(id);
    await Notification.deleteMany({ owner_id: id });

    res.status(201).json({ isSuccess: true, message: "Deletion Successful!" });
  } catch (error) {
    res
      .status(406)
      .json({ isSuccess: false, message: "Error deleting notification!" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const noti = await Notification.findById(id);
    if (!noti) {
      throw new Error("Notification is not found!");
    }
    noti.isRead = true;
    await noti.save();

    res
      .status(201)
      .json({ isSuccess: true, message: "Message is marked as read!" });
  } catch (error) {
    res
      .status(422)
      .json({ isSuccess: false, message: "Action is not successful!" });
  }
};
