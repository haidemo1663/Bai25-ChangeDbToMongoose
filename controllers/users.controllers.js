const shortId = require("shortid");
const db=require('../db');
const users=db.get('users');
const bcrypt = require('bcrypt');
const sgMail=require('@sendgrid/mail');
module.exports.index=(req,res)=>{
    var q = req.query.q;
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
    res.render('users/create');
}
module.exports.postCreate=(req,res)=>{
    const saltRounds = 10;
    var password= req.body.password;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        req.body.id=shortId.generate();
        req.body.password=hash;
        req.body.isAdmin=(req.body.isAdmin==='checked')?true:false;
        console.log(req.body);
        users.push(req.body).write();
        res.redirect('/users');
    });
    return;
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
    var phone=req.body.phone;
    users.find({id:id}).assign({name:name,phone:phone}).write();
    res.redirect('/users');
};
module.exports.delete=(req,res)=>{
    var id=req.params.id;
    users.remove({id:id}).write();
    res.redirect('/users');
}
module.exports.getSgMail=(req,res)=>{
    var id=req.params.id;
    var user= users.find({id:id}).value();
    res.render('users/contact',{users:user})
}
module.exports.postSgMail=(req,res)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    var message={
        to: req.body.mail,
        from: 'conchodien1207@gmail.com',
        subject: req.body.subject,
        text: req.body.content,
        html:`<strong> ${req.body.content}</strong>`
    }
    sgMail.send(message);
    res.redirect('/users')
}