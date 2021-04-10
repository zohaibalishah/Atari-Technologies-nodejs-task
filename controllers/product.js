var Product = require("../models/product");

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });

  }
};

module.exports = {
  allProducts,
};
