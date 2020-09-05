var loacalStorage=require('node-persist');
module.exports=async(req,res,next)=>{
    var listItem=await loacalStorage.getItem(req.signedCookies.SessionId);
    if(!listItem) listItem=[];
    var sm=listItem.reduce(function(acc,current){
        return acc+current.total;
    },0);
    var list={
        products: listItem,
        count: listItem.length,
        total: sm
    }
    res.locals.shoppingBags=list;
    next();
}