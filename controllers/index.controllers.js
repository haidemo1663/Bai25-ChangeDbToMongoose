const user=require('../models/User.model');
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
module.exports.login=(req,res,next)=>{
    res.render('login');
}
module.exports.postLogin=async(req,res)=>{
    var users=await user.findOne({"mail" : req.body.mail});
    var result= bcrypt.compareSync(req.body.password, users.password);
    if(result){
        res.cookie('id',users.id,{signed:true});
        res.redirect('/users');
    }
    else
    {
        res.redirect('/login');
    }
}
module.exports.profile=(req,res)=>{
    var user=users.find({id:req.signedCookies.id}).value();
    res.render('profile/index',{users:user});
}
module.exports.pProfile=async(req,res)=>{
    var x = db.get("users").find({id: req.signedCookies.id})
    if(!req.file){
        x
        .assign({ name: req.body.name},{phone:req.body.phone})
        .write();
    }
    else{
        var data=req.file.path;
        var result = await cloudinary.uploader.upload(data);
        x
        .assign({ name: req.body.name},{avatar:result.secure_url },{phone:req.body.phone})
        .write();
    }
    res.redirect('/profile');
}