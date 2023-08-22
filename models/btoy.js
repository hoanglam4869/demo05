var mongoose = require('mongoose');
var BSchema = mongoose.Schema({
    bname: String,
    bcategory: String,
    bdetail: String,
    bimage: String,
    bprice: Number,
    bquantity: Number
});
const btoy = mongoose.model('btoy', BSchema, 'btoy');
module.exports = btoy;