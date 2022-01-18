const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

const products = require('./routes/routes_products');

app.use(express.json());


app.use('/products', products);

mongoose.connect(
  "mongodb://mgrocery:muf8JKQmyw7zDCYHym0PWGh3O8EKegccH@35.242.162.250:27017/mGrocery",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to MongoDB");
});

app.listen(port, function () {
  console.log("listening at port", port);
});

