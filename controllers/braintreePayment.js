const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "pfvgcvq47yqd56s2",
  publicKey: "nqbqwy2ktx9r2rrr",
  privateKey: "e42fb2da1299680c2d6ab33e25efb1b5",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
      // return res.json(response);
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
