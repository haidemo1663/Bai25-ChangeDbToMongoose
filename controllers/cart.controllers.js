var localStorage=require('node-persist');
const Product = require('../models/Product.model');
module.exports.addToCart=async(req,res)=>{
    var id=req.params.id;
    var product=await Product.findOne({_id: id});
    var sessionid=req.signedCookies.SessionId;
    if(!sessionid){
        res.redirect('/');return;   
    }
    var list=await localStorage.getItem(sessionid);
    if(list){
        list=await localStorage.getItem(sessionid);
        var index=list.findIndex(item=>item.product._id===id);
        if(index<0) { list.push({'product':product,'count':1,'total':function(){
            return product.price *1;
        }})}
        else {
                list.map(function(item){
                if(item.product._id===id){
                    ++item.count;
                }
                item.total=item.product.price*item.count;
                return item;
            })
        }
    }
    else{
        list=[];
        list.push({'product':product,'count':1,'total':function(){
            return product.price *1;
        }});
    }
    await localStorage.setItem(sessionid,list);
    console.log(await localStorage.getItem(sessionid));
    res.redirect('/');return;
}
module.exports.shoppingCart=(req,res)=>{
    res.render('shoppingcart/index.pug',{});
}