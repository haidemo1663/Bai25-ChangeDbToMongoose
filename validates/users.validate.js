var db=require('../db'); 
module.exports.postCreate=(req,res,next)=>{
    var errors=[];
    if(!req.body.name)
        errors.push('Bạn Chưa Nhập Tên');
    if(!req.body.phone)
        errors.push('Bạn Chưa Nhập Số Điện Thoại');
    if(req.body.name.length>30)
        errors.push('Tên Vượt Quá 30 Ký Tự');
    var user=db.get('users').find({mail:req.body.mail}).value();
    if(user)
    {
        errors.push('Email đã tồn tại');
    }
    if(errors.length>0)
    {
        res.render('users/create',{errors: errors,values:req.body});
        return;
    }
    next();
}