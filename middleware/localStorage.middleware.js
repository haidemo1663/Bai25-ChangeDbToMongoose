var loacalStorage=require('node-persist');
module.exports=async(req,res,next)=>{
    var listItem=await loacalStorage.getItem(req.signedCookies.SessionId);
    if(!listItem) listItem=[];
    var smm=listItem.reduce(function(acc,current){
        return acc+current.count;
    },0);
    res.locals.summ=smm;
    res.locals.shoppingBags=listItem;
    next();
}