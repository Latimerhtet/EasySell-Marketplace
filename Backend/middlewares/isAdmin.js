const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    req.userId = userId;
    const user = await User.findById(userId).select("role");
    if (user.role !== "admin") {
      throw new Error("Unauthorized admin");
    }
    next();
  } catch (error) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};
