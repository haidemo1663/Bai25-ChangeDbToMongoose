const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const router=express.Router();

const db = require("../db");
const trans=db.get('transactions');
const users=db.get('users');
const books=db.get('books');
router.get('/create',(req,res)=>{
    res.render('trans/create',{users:users.value(),books:books.value()});
});

router.post('/create',(req,res)=>{
    var createTrans={};
    createTrans.id=shortId.generate();
    createTrans.userid=req.body.userid;
    createTrans.bookid=req.body.bookid;
    trans.push(createTrans).write();
    res.redirect('/trans');
    
});
router.get('/',(req,res)=>{
    var matchTrans=trans.value().map(tran=>{
        var temp={};
        temp.id=tran.id;
        temp.userid=users.value().find(u=>{return u.id==tran.userid}).name;
        temp.bookid=books.value().find(u=>{return u.id==tran.bookid}).title;
        return temp;
    });
    res.render('trans/index',{trans:matchTrans});
})

module.exports=router;