const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

exports.getToken = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.makePayment = async (req, res) => {
  try {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;
    const result = await gateway.transaction.sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    });
    return res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: err,
    });
  }
};
