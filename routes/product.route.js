const express = require("express");
const router = express.Router();
const { isAdmin } = require("../helpers/middlewares");
const productController = require("../controllers/product");

router.get("/", isAdmin, productController.allProducts);

module.exports = router;
