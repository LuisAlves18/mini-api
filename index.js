const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
const wget = require("node-wget");

app.use(express.json());
app.get("/", function (req, res) {
  wget(
    {
      url: "http://portfir.insa.pt/assets/downloads/insa_tca.xlsx",
      dest: "./dbPortfir.xlsx",
    },
    function () {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile("./dbPortfir.xlsx");
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      console.log(xlData);
      res.send(xlData);
    }
  );
});
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
