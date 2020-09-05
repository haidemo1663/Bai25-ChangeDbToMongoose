var localStorage=require('node-persist');
const Product = require('../models/Product.model');
const Transaction=require('../models/Transaction.model');
module.exports.addToCart=async(req,res)=>{
    var id=req.params.id;
    var product=await Product.findOne({_id: id});
    var sessionid=req.signedCookies.SessionId;
    if(!sessionid){
        res.redirect('/');return;   
    }
    var list=await localStorage.getItem(sessionid);
    var total=function(){
        return parseInt(product.price * 1)}
    if(list){
        var index=list.findIndex(item=>item.product._id===id);
        if(index<0) { list.push({'product':product,'quantity':1,'total':total()})}
        else {
                list.map(function(item){
                if(item.product._id===id){
                    ++item.quantity;
                }
                item.total=item.product.price*item.quantity;
                return item;
            })
        }
    }
    else{
        list=[];
        list.push({'product':product,'quantity':1,'total':total()})
        }
    await localStorage.setItem(sessionid,list);
    res.redirect('/');return;
}
module.exports.shoppingCart=(req,res)=>{
    res.render('shoppingcart/index.pug',{});
}
module.exports.addToTransactions=async(req,res)=>{
    var bagg=res.locals.shoppingBags;
    var sessionid=req.signedCookies.SessionId;
    var lii= bagg.products.map(function(item){
       var temp={};
       temp.productId=item.product._id;
       temp.quantity=item.quantity;
       return temp;
    });
    
    await Transaction.create({
        products:lii,
        total:bagg.total
    });
    await localStorage.removeItem(sessionid);
    res.redirect('/books');

}