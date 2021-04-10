const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var config = require("dotenv").config().parsed;

require("./config/db")();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", require("./routes/users.route"));
app.use("/api/products", require("./routes/product.route"));

let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port number" + port);
});
