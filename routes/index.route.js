const express = require("express");
const router=express.Router();
const getIndex=require('../controllers/index.controllers');
router.get('/',getIndex.index);
router.get('/login',getIndex.login);
router.post('/login',getIndex.postLogin);
module.exports=router;