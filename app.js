require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  path = require("path");

// My Routes
const authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user"),
  categoryRoutes = require("./routes/category"),
  productRoutes = require("./routes/product"),
  orderRoutes = require("./routes/order"),
  stripeRoutes = require("./routes/stripePayment");
const braintreeRoutes = require("./routes/braintreePayment");

const MONGO_URI = process.env.DATABASE || "mongodb://localhost:27017/tshirt";
mongoose
  .connect(MONGO_URI, {
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

app.use(express.static("frontend/build"));

if (process.env.NODE_ENV === "production") {
  // serve static file
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "frontend/build/index.html"));
  });
}

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
