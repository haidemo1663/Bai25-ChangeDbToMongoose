var shortId=require('shortid');
var localStorage=require('node-persist');
module.exports=async(req,res,next)=>{
    if(!req.signedCookies.SessionId){
        var sessionid=shortId.generate();
        res.cookie('SessionId',sessionid,{
            signed: true
        });
    }
    try{
        await localStorage.init({
            dir:'localStorage',
            ttl: 30 * 60 * 1000,
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            expiredInterval: 1 * 60 * 1000 // every 2 minutes the process will clean-up the expired cache
        });
    }
    catch{
        console.log("Loi con me no roi");
    }
    
    next();
}