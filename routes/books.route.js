const express = require("express");
const router=express.Router();
const bookControllers=require('../controllers/books.controllers')
router.get("/", bookControllers.index);
router.get("/create", bookControllers.createView);
router.post("/create", bookControllers.create);
router.get("/:id", bookControllers.view);
router.get("/:id/delete", bookControllers.delete);
router.get("/:id/update", bookControllers.updateView);
router.post("/:id/update", bookControllers.update);

module.exports=router;