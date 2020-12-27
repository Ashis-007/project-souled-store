const { Order, ProductCart } = require("../models/order");

exports.getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id)
      .populate("products.product", "name price")
      .exec();
    req.order = order;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Order not found",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body.order);
    req.body.order.user = req.profile;
    await order.save();
    res.json(order);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Failed to save your order in DB",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "_id name").exec();
    res.json(orders);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "No orders found",
    });
  }
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update order status",
        });
      }

      res.json(order);
    }
  );
};
