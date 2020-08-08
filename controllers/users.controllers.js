const shortId = require("shortid");
const db=require('../db');
const users=db.get('users');
module.exports.index=(req,res)=>{
    var q = req.query.name;
    if (!q) {
      res.render("users/index", { users: users.value() });
    } else {
      var matchUser = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      res.render("users/index", { users: matchUser.value(), keyword: q });
    }
};
module.exports.getCreate=(req,res)=>{
    res.render('users/create',{users:users.value()});
}
module.exports.postCreate=(req,res)=>{
    var userName={};
    userName.id=shortId.generate();
    userName.name=req.body.name;
    users.push(userName).write();
    res.redirect('/users');
};
module.exports.view=(req,res)=>{
    var id=req.params.id;
    var user=users.find({id:id}).value();
    res.render('users/view',{users:user});
};
module.exports.getUpdate=(req,res)=>{
    var id=req.params.id;
    var user=users.find({id:id}).value();
    res.render('users/update',{users:user});
};
module.exports.postUpdate=(req,res)=>{
    var id=req.body.id;
    var name=req.body.name;
    users.find({id:id}).assign({name:name}).write();
    res.redirect('/users');
};
module.exports.delete=(req,res)=>{
    var id=req.params.id;
    users.remove({id:id}).write();
    res.redirect('/users');
}