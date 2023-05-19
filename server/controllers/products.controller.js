const productsController = {};
const Product = require("../models/Product");

productsController.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

productsController.createProduct = async (req, res) => {
  const { name, price, stock, img } = req.body;
  const newProduct = new Product({
    name,
    price,
    stock,
    img,
  });
  await newProduct.save();
  res.json({ message: "Product Saved" });
};

productsController.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

productsController.updateProduct = async (req, res) => {
  const { name, price, stock, img } = req.body;
  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { name, price, stock, img },
    { new: true }
  );
  res.json({ message: "Product Updated" });
};

productsController.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};

module.exports = productsController;
