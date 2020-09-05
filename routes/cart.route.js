const express = require("express");
const router=express.Router();
const cartItemController=require('../controllers/cart.controllers');
router.get('/:id/addToCart',cartItemController.addToCart);
router.get('/',cartItemController.shoppingCart);
router.get('/addToTransactions',cartItemController.addToTransactions);
module.exports=router;
