const db=require('../db');
const users=db.get('users');
const bcrypt = require('bcrypt');
module.exports.index=(req,res,next)=>{
    res.render('index');
}
module.exports.login=(req,res,next)=>{
    res.render('login');
}
module.exports.postLogin=(req,res,next)=>{
    var user=users.find({mail:req.body.mail}).value();
    res.cookie('id',user.id);
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