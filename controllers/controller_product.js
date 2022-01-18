const product = require("../models/model_product");
const dbPortfir = require("../index");
const wget = require("node-wget");

const addProduct = (req, res) => {
  wget(
    {
      url: "http://portfir.insa.pt/assets/downloads/insa_tca.xlsx",
      dest: "./dbPortfir.xlsx",
    },
    (getDbPortfir = () => {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile("./dbPortfir.xlsx");
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      
      res.send(xlData);
      xlData.pop();
      xlData.forEach((data) => {
          console.log(data)
        const newProduct = new product({
          code: data.__EMPTY,
          nome: data.__EMPTY_1,
          energia: data.__EMPTY_11,
          lipidos: data.__EMPTY_5,
          hidratos: data.__EMPTY_11,
          acucares: data.__EMPTY_12,
          fibra: data.__EMPTY_15,
          proteina: data.__EMPTY_16,
          sal: data.__EMPTY_17,
        });
        newProduct.save(function (err, product) {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json(product);
        });
      });
    })
  );
};
exports.addProduct = addProduct;
