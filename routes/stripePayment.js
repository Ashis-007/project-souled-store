const express = require("express"),
  router = express.Router();

const { makePayment } = require("../controllers/stripePayment");

router.post("/stripepayment", makePayment);

module.exports = router;
