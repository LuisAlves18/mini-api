const product = require("../models/model_product");
const dbPortfir = require("../index");
const wget = require("node-wget");
const async = require("async");

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
      
      xlData.shift();

      let stack = [];
      let products = []; 

      xlData.forEach((data) => {
        stack.push((callback) => {

          product.find({code: data.__EMPTY}).then(res => {
            if(res && res.length > 0) {
             return callback()
            } else {
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
                  return callback(); 
                }
                products.push(product);
                return callback();
              });
            }
          }).catch((err) => {
            log.error(err)
            return callback();
          })
        })
      });

      async.parallel(stack, () => {
        res.status(200).json(products)
      })
    })
  );
};
exports.addProduct = addProduct;
