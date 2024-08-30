const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      throw Error("Unauthorized");
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};
