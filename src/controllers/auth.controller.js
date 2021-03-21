require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { sendError } = require("../utils/helper");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

const signup = async (req, res) => {
  try {
    const [has_error, errors] = sendError(req);
    if (has_error) return res.status(400).json({ data: errors });
    let user = await User.create(req.body);
    const token = newToken(user);
    res.status(201).json({ data: { token } });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const signin = async (req, res) => {
  try {
    const [has_error, errors] = sendError(req);
    if (has_error) return res.status(400).json({ data: errors });

    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user)
      return res
        .status(401)
        .json({ message: "Your email or password is not correct" });

    const match = await user.checkPassword(req.body.password);
    if (!match)
      return res
        .status(401)
        .json({ message: "Your email or password is not correct" });

    const token = newToken(user);
    return res.status(201).json({ data: { token } });
  } catch (e) {}
};

module.exports = {
  signup,
  signin,
};
