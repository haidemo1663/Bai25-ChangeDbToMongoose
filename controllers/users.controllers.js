const bcrypt = require('bcrypt');
var user=require('../models/User.model');
const sgMail=require('@sendgrid/mail');
module.exports.index=async (req,res)=>{
    var q = req.query.q;
    var users=await user.find({});
    if (!q) {
      res.render("users/index", { users: users});
    } else {
        var matchUser = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      res.render("users/index", { users: matchUser, keyword: q });
    }
};
module.exports.getCreate=(req,res)=>{
    res.render('users/create');
}
module.exports.postCreate=(req,res)=>{
    const saltRounds = 10;
    var password= req.body.password;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        req.body.password=hash;
        req.body.avatar=req.file.path.split("\\").slice(1).join("/");
        req.body.isAdmin=(req.body.isAdmin==='checked')?true:false;
        user.create(req.body);
        res.redirect('/users');
    });
    return;
};
module.exports.view=async (req,res)=>{
    var id=req.params.id;
    var person=await user.find({_id: id});
    res.render('users/view',{users: person});
};
module.exports.update=async (req,res)=>{
    var id=req.params.id;
    var person=await user.find({_id:id});
    res.render('users/update',{users:person[0]});
};
module.exports.pUpdate=async(req,res)=>{
    var newContent=req.body;
    user.findOneAndUpdate({_id:newContent.id},req.body)
    .then( res.redirect('/users'));
};
module.exports.delete=(req,res)=>{
    var id=req.params.id;
    user.findOneAndDelete({_id:id}).then(res.redirect('/users'));
}
module.exports.getSgMail=(req,res)=>{
    var id=req.params.id;
    var users= user.find({id:id});
    res.render('users/contact',{users:users})
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