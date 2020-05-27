const express = require("express"),
  router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");
const { getToken, makePayment } = require("../controllers/braintreePayment");

router.param("userId", getUserbyId);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  makePayment
);

module.exports = router;
