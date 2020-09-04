var user=require('../models/User.model');
module.exports.postLogin=async (req,res,next)=>{
    if(!req.signedCookies.id)
    {   
        res.redirect('/login');
        return;
    }
    var users=await user.find({_id:req.signedCookies.id});
    if(!users)
    {
        res.redirect('/login'); return
    }
    res.locals.user=users[0];
    next();
}