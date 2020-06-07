const express = require("express"),
  router = express.Router();
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    // TODO: Add more validations here
    check("name", "Name should contain atleast 3 characters").isLength({
      min: 3,
    }),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should atleast contain 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Please enter a valid email").isEmail(),
    // TODO: Add more validations here
    check("password", "Password should atleast contain 3 characters").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
