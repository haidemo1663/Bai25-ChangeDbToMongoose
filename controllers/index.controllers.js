const db=require('../db');
const users=db.get('users');
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
module.exports.postLogin=(req,res,next)=>{
    var user=users.find({mail:req.body.mail}).value();
    res.cookie('id',user.id,{signed:true});
    res.redirect('/users');
}
module.exports.countWrongLogin=(req,res,next)=>{
    const password= req.body.password;
    var errors=[];
    var user=users.find({mail:req.body.mail}).value();
    if(!user)
    {
        errors.push('Account does not exists');
    };
    if(user.countWrongLogin<4){
        var result=bcrypt.compareSync(password, user.password, function(err, result) {});
        if(!result)
        {
            errors.push('Password is wrong');
        }
    }   
    else errors.push('Account blocked!');
    if(errors.length>0)
    {
        user.countWrongLogin++;
        res.render('login',{errors:errors,values:req.body});
        return;
    }
    next();
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