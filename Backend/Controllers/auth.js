const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, messages: errors.array()[0] });
  }
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      throw new Error("User already existed");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name,
      password: hashedPassword,
      email,
    });
    return res
      .status(201)
      .json({ isSuccess: true, message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ isSuccess: false, messages: err.message });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array[0].msg });
  }
  const { email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email }).select(
      "name email password role status"
    );
    console.log(existedUser);
    // is user already existed
    if (!existedUser) {
      throw new Error("Invalid user credentials");
    }
    if (existedUser.status === "banned") {
      throw new Error("Your account is banned!");
    }

    // does user password match
    const isValidate = bcrypt.compareSync(password, existedUser.password);

    if (!isValidate) {
      throw new Error("Invalid user credentials");
    }

    const token = jwt.sign(
      { email, name: existedUser.name, userId: existedUser._id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ isSuccess: true, token, user: existedUser });
  } catch (err) {
    return res.status(422).json({ isSuccess: false, message: err.message });
  }
};

exports.checkUserAuth = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.userId).select("name email role");
    if (!userDoc) {
      throw new Error("User is not authorized");
    }
    res
      .status(200)
      .json({ isSuccess: true, message: "User is authorized", user: userDoc });
  } catch (error) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};
