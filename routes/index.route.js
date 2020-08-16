const express = require("express");
const router=express.Router();
const getIndex=require('../controllers/index.controllers');
const accountValidate=require('../controllers/index.controllers')
router.get('/',getIndex.index);
router.get('/login',getIndex.login);
router.post('/login',accountValidate.countWrongLogin,getIndex.postLogin);
module.exports=router;