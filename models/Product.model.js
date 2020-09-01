var mongoose=require('mongoose');
var productSchema=new mongoose.Schema({
    title: String,
    author: String,
    decription: String,
    price: Number,
    coverUrl: String
});
var Product=mongoose.model('Products',productSchema,'Products');
module.exports=Product;