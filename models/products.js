const mongoose = require('mongoose');

const eproduct = new mongoose.Schema({
pname: {
        type: String,
        required: true,
    },
    pprice: {
        type: String,
        required: true,
    },
    pquantity:{
        type: String,
        required: true,
    }
});


const Product = new mongoose.model('Product', eproduct);

module.exports = Product;