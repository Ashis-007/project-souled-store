const express = require("express"),
  router = express.Router();

const { getUserbyId } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllCategories,
} = require("../controllers/product");

// Params
router.param("userId", getUserbyId);
router.param("productId", getProductById);

// Routes

// CREATE
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// READ
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// UPDATE
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// DELETE
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

// Listing route
router.get("/products", getAllProducts);
router.get("/products/categories", getAllCategories);

module.exports = router;
