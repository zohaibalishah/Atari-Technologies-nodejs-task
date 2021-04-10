const express = require("express");
const router = express.Router();
const {auth, isAdmin } = require("../helpers/middlewares");
const productController = require("../controllers/product");

router.get("/",auth, isAdmin, productController.allProducts);

module.exports = router;
