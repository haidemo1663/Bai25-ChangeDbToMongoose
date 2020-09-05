var mongoose=require('mongoose');
const { ObjectId } = require('mongodb');
var userSchema=new mongoose.Schema({
    products:[{
        productId:{
            type: ObjectId,
        },
        quantity: Number,
    }],
    total: Number,
    Date:{
        type:Date,
        default: Date.now
    }
});
var Transaction=mongoose.model('Transaction',userSchema,'Transaction');
module.exports=Transaction;