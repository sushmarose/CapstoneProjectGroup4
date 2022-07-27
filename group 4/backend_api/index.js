const express = require("express");
const {
  saveProduct,
  searchProducts,
  getProductCategories,
  getProductById,
  updateProductDetails,
  deleteProduct
} = require("./controllers/product");
const router = express.Router();
const { signUp, signIn } = require("./controllers/auth");
const admin = require("./middleware/admin");
const auth = require("./middleware/auth");

//Auth
router.post("/api/v1/users", signUp);
router.post("/api/v1/auth", signIn);


//Product
router.post("/api/v1/products", saveProduct);
router.get("/api/v1/products", searchProducts);
router.get("/api/v1/products/categories", getProductCategories);
router.get("/api/v1/products/:id", getProductById);
router.put("/api/v1/products/:id", updateProductDetails);
router.delete("/api/v1/products/:id", deleteProduct);



module.exports = router;
