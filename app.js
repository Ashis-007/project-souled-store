require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cors = require("cors");

// My Routes
const authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user"),
  categoryRoutes = require("./routes/category"),
  productRoutes = require("./routes/product"),
  orderRoutes = require("./routes/order"),
  stripeRoutes = require("./routes/stripePayment");
const braintreeRoutes = require("./routes/braintreePayment");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("==== DB CONNECTED ====");
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", braintreeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started at port", port);
});
