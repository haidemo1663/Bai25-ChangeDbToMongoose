const  db=require('../db');

module.exports.postLogin=(req,res,next)=>{
    if(!req.cookies.id)
    {   
        res.redirect('/login');
        return;
    }
    var user=db.get('users').find({id:req.cookies.id}).value();
    if(!user)
    {
        res.redirect('/login'); return
    }
    next();
}
module.exports.authUserValidate=(req,res,next)=>{
    var user=db.get('users').find({id:req.cookies.id}).value();
    if(user.isAdmin){
        next();
    }
    else{
        res.redirect('/books');return;
    }
}