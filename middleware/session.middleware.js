var shortId=require('shortid');
var db=require('../db');
module.exports=(req,res,next)=>{
    if(!req.signedCookies.SessionId){
        var sessionid=shortId.generate();
        res.cookie('SessionId',sessionid,{
            signed: true
        });
        db.get('sessions')
        .push({id:sessionid})
        .write();
    }
    next();
}