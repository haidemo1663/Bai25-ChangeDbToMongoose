const shortId = require("shortid");
const db=require('../db');
const books=db.get('books');
module.exports.createView= (req, res) => {
    res.render("books/create", { books: db.get("books").value() });
  };
module.exports.create=(req, res) => {
    var book = {};
    book.id = shortId.generate();
    book.title = req.body.title;
    book.decription = req.body.decription;
    console.log(book);
  
    db.get("books")
      .push(book)
      .write();
    res.redirect("/books");
  }
module.exports.index=(req, res) => {
    var q = req.query.q;
    if (!q) {
      res.render("books/index", { books: books.value() });
    } else {
      var matchBook = books.filter(book => {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      res.render("books/index", { books: matchBook.value(), keyword: q });
    }
  }
module.exports.view=(req, res) => {
    var id = req.params.id;
    var book = books.find({ id: id }).value();
    res.render("books/view", { books: book });
  };
module.exports.delete=(req, res) => {
    var id = req.params.id;
    books.remove({ id: id }).write();
    res.redirect("/books");
  };
module.exports.updateView= (req, res) => {
    var id = req.params.id;
    var book = books.find({ id: id }).value();
    res.render("books/update", { books: book});
}
module.exports.update=(req, res) => {
    var id = req.body.id;
    console.log(id);
    books
      .find({ id: id })
      .assign({ title: req.body.title, decription: req.body.decription })
      .write();
    res.redirect("/books");
  }
