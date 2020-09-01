const express = require("express");
const router=express.Router();
const cartItemController=require('../controllers/cart.controllers');
const userSession=require('../validates/users.validate');
router.get('/:id/addToCart',cartItemController.addToCart);
router.get('/ShoppingCart',userSession.userSession,cartItemController.shoppingCart);
module.exports=router;
