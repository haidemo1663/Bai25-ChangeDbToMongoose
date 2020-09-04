var mongoose=require('mongoose');
module.exports=(req,res,next)=>{
    try{
        mongoose.connect(process.env.MONGOOSE_URL);
        next();
    }
    catch{
        
    }
}