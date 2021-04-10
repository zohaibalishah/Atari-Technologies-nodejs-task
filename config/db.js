const mongoose = require("mongoose");
var config = require('dotenv').config().parsed;
const connectDB = async () => {
  try {
    await mongoose.connect(
        config.MONGO_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB is connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
