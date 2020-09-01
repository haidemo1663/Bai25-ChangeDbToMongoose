var db=require('../db');
module.exports.addToCart=(req,res)=>{
    var id=req.params.id;
    var sessionid=req.signedCookies.SessionId;
    if(!sessionid){
        res.redirect('/');return;
    }
    var count=db
        .get('sessions')
        .find({id:sessionid})
        .get('cart.'+id,0)
        .value();
    db.get('sessions')
    .find({id:sessionid})
    .set('cart.'+id,count+1)
    .write();
    res.redirect('/');
}
module.exports.shoppingCart=(req,res)=>{
    res.render('shoppingcart/index.pug',{});
}