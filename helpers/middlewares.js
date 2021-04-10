const config = require("dotenv").config().parsed;

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(403).send("forbidden you are not admin");
  }
};

module.exports.isManager = async (req, res, next) => {
  if (req.user.role == "manager") {
    next();
  } else {
    return res.status(403).send("forbidden you are not admin");
  }
};

module.exports.auth = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
