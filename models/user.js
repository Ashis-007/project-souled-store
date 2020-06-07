const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      maxlength: 30,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: Number,
      // required: true,
      unique: true,
    },

    userInfo: {
      type: String,
      trim: true,
    },

    // TODO: come back here
    encry_password: {
      type: String,
      required: true,
      trim: true,
    },

    salt: String,

    role: {
      type: Number,
      // required: true,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this.salt = uuid();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return password;
  });

userSchema.method({
  authenticate: function (plainpassword) {
    return this.encry_password === this.securePassword(plainpassword);
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
});

module.exports = mongoose.model("User", userSchema);
