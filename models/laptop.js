var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var laptopSchema = Schema({
    name    : String,
    price : String
});

module.exports = mongoose.model('Laptop', laptopSchema);