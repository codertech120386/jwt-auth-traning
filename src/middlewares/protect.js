const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      console.log("here", err, payload);
      if (err) return reject(err);
      return resolve(payload);
    });
  });

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log("bearer", bearer);
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "failed",
      message: "You are not authorized to access this page",
    });
  }

  const token = bearer.split("Bearer ")[1].trim();
  console.log("token", token);
  let payload;
  try {
    payload = await verifyToken(token);
    console.log("payload", payload);
  } catch (e) {
    return res.status(401).json({
      status: "failed",
      message: "You are not authorized to access this page",
    });
  }

  let user;
  try {
    user = User.findById(payload.id).lean().exec();
  } catch (e) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong .. please try again later",
    });
  }

  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "You are not authorized to access this page",
    });
  }

  req.user = user;
  next();
};

module.exports = protect;
