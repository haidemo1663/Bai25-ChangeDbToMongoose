const express = require("express");
const router=express.Router();
const userControllers=require('../controllers/users.controllers');
const userValidates=require('../validates/users.validate');
var authorUser=require('../validates/auth.validate');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads' });
router.get('/',userControllers.index)
router.get('/create', userControllers.getCreate);
router.post('/create',upload.single('avatar'),userValidates.postCreate,userControllers.postCreate);
router.get('/:id/', userControllers.view);
router.get('/:id/update', userControllers.update);
router.post('/:id/update', userControllers.pUpdate);
router.get('/:id/delete',userControllers.delete);
router.get('/:id/mail',userControllers.getSgMail);
router.post('/:id/mail',userControllers.postSgMail);

module.exports= router;