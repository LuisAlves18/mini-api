const express = require("express");
const port = 3000;
const app = express();
const wget = require("node-wget")
app.get("/", function (req, res) {

wget({url: "http://portfir.insa.pt/assets/downloads/insa_tca.xlsx", dest: "./dbPortfir.xlsx"}, function(){
    var XLSX = require("xlsx");
  var workbook = XLSX.readFile("./dbPortfir.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(xlData);
  res.send(xlData);
});
 
  
});
app.listen(port, function () {
  console.log("listening at port", port);
});
