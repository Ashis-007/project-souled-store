const braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "pfvgcvq47yqd56s2",
  publicKey: "ww96mk467kq8nbs4",
  privateKey: "607177d796e5c98de99a5a69d57a0bc2",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      // res.send(response);
      return res.json(response);
    }
  });
};

exports.makePayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        return res.json(result);
      }
    }
  );
};
