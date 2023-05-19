const { Router } = require("express");
const router = Router();

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
