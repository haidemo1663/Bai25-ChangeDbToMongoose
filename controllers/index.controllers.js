const db=require('../db');
const users=db.get('users');
module.exports.index=(req,res,next)=>{
    res.render('index');
}
module.exports.login=(req,res,next)=>{
    res.render('login');
}
module.exports.postLogin=(req,res,next)=>{
    var errors=[];
    var user=users.find({mail:req.body.mail}).value();
    console.log(user);
    if(!user)
    {
        errors.push('Account does not exists');
    }
    else if(user && user.password !== req.body.password)
    {
        errors.push('Password is wrong');
    }
    if(errors.length>0)
        {res.render('login',{errors:errors,values:req.body});return}
    res.cookie('id',user.id);
    if(user.isAdmin==='true'){
        res.redirect('/users');
    }
    else{
        res.redirect('/trans');
    }
    
}