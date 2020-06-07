const express = require("express"),
  router = express.Router();

const { getUserbyId, pushOrder } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

// PARAMS
router.param("userId", getUserbyId);
router.param("orderId", getOrderById);

// ROUTES

// CREATE
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrder,
  updateStock,
  createOrder
);

// READ
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Status
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
