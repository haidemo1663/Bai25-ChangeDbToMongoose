const express = require("express");
const router=express.Router();
const productControllers=require('../controllers/product.contrllers');
router.get('/',productControllers.index);
module.exports=router;
