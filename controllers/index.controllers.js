const user=require('../models/User.model');
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
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
module.exports.profile=async(req,res)=>{
    var person=await user.findOne({_id :req.signedCookies.id});
    res.render('profile/index',{users:person});
}
module.exports.pProfile=async(req,res)=>{
    if(!req.file){
        await user.findOneAndUpdate({_id :req.signedCookies.id},{name: req.body.name,phone:req.body.phone});
    }
    else{
        var data=req.file.path;
        var result = await cloudinary.uploader.upload(data);
        await user.findOneAndUpdate({_id :req.signedCookies.id},{name: req.body.name,phone:req.body.phone,avatar:result.secure_url });
    }
    res.redirect('/profile');
}