var products=require('../models/Product.model');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
module.exports.createView= (req, res) => {
    res.render("books/create");
  };
module.exports.create=async(req, res) => {
  var data=req.file.path;
  req.body.id=shortId.generate();
  var result = await cloudinary.uploader.upload(data);
  req.body.coverUrl=result.secure_url;
  res.redirect('/');
}
module.exports.index=async(req, res) => {
    var page = parseInt(req.query.page) || 1; //n
    var nextPage = page+1;
    var prePage = page-1;
    var perPage = 8; //x
    var start = (page-1)*perPage;
    var q = req.query.q;
    var product= await products.find({}).limit(perPage).skip(start);
    if (!q) {
      res.render("books/index", {
        // products: db.get("products").value().slice(start,end)
        user:res.locals.user,
        products: product,
        listPage: [prePage,page,nextPage],
        values:req.body 
    });
    } else {
      var matchBook = product.filter(book => {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      res.render("books/index", {
        // products: db.get("products").value().slice(start,end)
        products: matchBook,
        listPage: [prePage,page,nextPage],
        values:req.body
    });
    }
}
module.exports.view=(req, res) => {
    var id = req.params.id;
    var book = products.find({ _id: id });
    res.render("books/view", { books: book });
  };
module.exports.delete=(req, res) => {
    var id = req.params.id;
    products.deleteOne({_id:id});
    res.redirect("/books");
  };
module.exports.updateView= (req, res) => {
    var id = req.params.id;
    var product = products.find({ _id: id });
    res.render("books/update", { values: book});
}
module.exports.update=async(req, res) => {
  var data=req.file.path;
  var result = await cloudinary.uploader.upload(data);
  req.body.coverUrl=result.secure_url;
    products
      .findOneAndUpdate({ _id:req.body.id},req.body);
    res.redirect("/books");
  }
