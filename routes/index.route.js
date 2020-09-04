const express = require("express");
const router=express.Router();
const getIndex=require('../controllers/index.controllers');
const auth=require('../validates/auth.validate');
var homeView=require('../controllers/books.controllers')
const upload=require('../middleware/multer');
router.get('/',homeView.index);
router.get('/login',getIndex.login);
router.post('/login',getIndex.postLogin);
router.get('/profile',auth.postLogin,getIndex.profile);
router.post('/profile',upload.single('avatar'),getIndex.pProfile);
module.exports=router;