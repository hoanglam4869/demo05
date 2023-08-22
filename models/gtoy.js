var mongoose = require('mongoose');
var GSchema = mongoose.Schema({
    gname: String,
    gcategory: String,
    gdetail: String,
    gimage: String,
    gprice: Number,
    gquantity: Number
});
const gtoy = mongoose.model('gtoy', GSchema, 'gtoy');
module.exports = gtoy;