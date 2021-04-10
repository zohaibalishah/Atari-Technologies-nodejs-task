const bcrypt = require("bcryptjs");
const config = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");

module.exports.getHashValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(value, salt);
  return hashValue;
};

module.exports.comparePassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};

module.exports.createJWTToken = async (user) => {
  const accessToken = await jwt.sign(
    { role: user.role, id: user._id },
    config.JWT_SECRET_KEY
  );
  return accessToken;
};
