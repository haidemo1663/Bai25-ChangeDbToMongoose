var count= 0;
module.exports.cookies=(req,res,next)=>{
    if(res.cookie)
       { count++;}
    console.log('count Cookies: '+count);
    next();
}