const User = require("../models/user");
const Order = require("../models/order");

exports.getUserbyId = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    req.profile = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Could not find user in DB",
    });
  }
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    {
      _id: req.profile._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }

      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.profile._id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Could not delete user",
      });
    }
  });
};

exports.userPurchaseList = async (req, res) => {
  try {
    const order = await Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .exec();
    res.json(order);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "No order in this account",
    });
  }
};

exports.pushOrder = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // Store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }

      next();
    }
  );
};
