var mongoose = require('mongoose');
var ASchema = mongoose.Schema({
    aname: String,
    acategory: String,
    adetail: String,
    aimage: String,
    aprice: Number,
    aquantity: Number
});
const atoy = mongoose.model('atoy', ASchema, 'atoy');
module.exports = atoy;