const config = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({ err: "forbidden you are not admin" });
  }
};

module.exports.isManager = async (req, res, next) => {
  if (req.user.role == "manager") {
    next();
  } else {
    return res.status(403).json({ err: "forbidden you are not manager" });
  }
};

module.exports.auth = async (req, res, next) => {
  const token = req.header("authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ err: "No token, Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};
