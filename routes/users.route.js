const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const router=express.Router();


const db=require('../db');
const users=db.get('users');
router.get('/',(req,res)=>{
    var q = req.query.name;
    console.log(q);
    if (!q) {
      res.render("users/index", { users: users.value() });
    } else {
      var matchUser = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      console.log(matchUser.value());
      res.render("users/index", { users: matchUser.value(), keyword: q });
    }
})
router.get('/create',(req,res)=>{
  res.render('users/create',{users:users.value()});
});
router.post('/create',(req,res)=>{
  var userName={};
  userName.id=shortId.generate();
  userName.name=req.body.name;
  console.log(userName);
  users.push(userName).write();
  res.redirect('/users');
});
router.get('/:id',(req,res)=>{
  var id=req.params.id;
  var user=users.find({id:id}).value();
  console.log(user);
  res.render('users/view',{users:user});
});
router.get('/:id/update',(req,res)=>{
  var id=req.params.id;
  var user=users.find({id:id}).value();
  res.render('users/update',{users:user,id:id});
});
router.post('/:id/update',(req,res)=>{
  var id=req.body.id;
  var name=req.body.name;
  users.find({id:id}).assign({name:name}).write();
  res.redirect('/users');
});
router.get('/:id/delete',(req,res)=>{
  var id=req.params.id;
  users.remove({id:id}).write();
  res.redirect('/users');
});
module.exports= router;