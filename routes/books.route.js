const express = require("express");
const router=express.Router();
const bookControllers=require('../controllers/books.controllers');
const upload=require('../middleware/multer');
router.get("/",bookControllers.index);
router.get("/create",bookControllers.createView);
router.post("/create",upload.single('coverUrl'),bookControllers.create);
router.get("/:id", bookControllers.view);
router.get("/:id/delete", bookControllers.delete);
router.get("/:id/update", bookControllers.updateView);
router.post("/:id/update",upload.single('coverUrl') ,bookControllers.update);

module.exports=router;