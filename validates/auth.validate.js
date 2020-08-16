const  db=require('../db');

module.exports.postLogin=(req,res,next)=>{
    if(!req.signedCookies.id)
    {   
        res.redirect('/login');
        return;
    }
    var user=db.get('users').find({id:req.signedCookies.id}).value();
    if(!user)
    {
        res.redirect('/login'); return
    }
    res.locals.user=user;
    next();
}
module.exports.authUserValidate=(req,res,next)=>{
    var user=db.get('users').find({id:req.signedCookies.id}).value();
    if(user.isAdmin){
        next();
    }
    else{
        res.redirect('/books');return;
    }
}