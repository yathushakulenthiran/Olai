var mongoose = require('mongoose');
//schema to our checkout details
var checkoutSchema = mongoose.Schema({
meals:{type:String},
firstName:{type:String},
lastName:{type:String},
phonenumber:{type:Number},
email:{type:String},
country:{type:String},
address:{type:String},
zip:{type:String}
});

module.exports = mongoose.model('checkout', checkoutSchema);
