module.exports.postCreate=(req,res,next)=>{
    var errors=[];
    if(!req.body.name)
        errors.push('Bạn Chưa Nhập Tên');
    if(!req.body.phone)
        errors.push('Bạn Chưa Nhập Số Điện Thoại');
    if(req.body.name.length>30)
        errors.push('Tên Vượt Quá 30 Ký Tự')
    if(errors.length>0)
    {
        res.render('users/create',{errors: errors,values:req.body});
        return;
    }
    next();
}