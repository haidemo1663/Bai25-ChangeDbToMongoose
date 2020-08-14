const  db=require('../db');

module.exports.postLogin=(req,res,next)=>{
    if(!req.cookies.id)
    {   
        res.redirect('/login');
        return;
    }
    var user=db.get('users').find({id:req.cookies.id}).value();
    console.log(user)
    if(!user)
    {
        res.redirect('/login'); return
    }
    next();
}