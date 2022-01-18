const mongoose = require('mongoose');

const nutritionalSchema = mongoose.Schema({
    code: Number,
    nome: String,
    energia: Number,
    lipidos: Number,
    hidratos: Number,
    acucares: Number,
    fibra: Number,
    proteina: Number,
    sal: Number
});

const product = mongoose.model('iopaymentcard_portfir', nutritionalSchema);

module.exports = product; 