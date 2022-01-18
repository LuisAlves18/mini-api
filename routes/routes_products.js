var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller_product')

router
.get('/', function (req, res) {
    controller.getproducts(req, res);
})
.post('/', function (req, res) {
    controller.addProduct(req, res);
})
module.exports = router