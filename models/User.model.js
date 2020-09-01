var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    password: String,
    avatar: String,
    isAdmin: Boolean
});
var User=mongoose.model('User',userSchema,'User');
module.exports=User;