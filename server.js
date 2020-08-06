const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const db=require('./db');
const books=db.get('books');
const app = express();

const routeUser=require('./routes/users.route')
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/books/create", (req, res) => {
  res.render("books/create", { books: db.get("books").value() });
});

app.post("/books/create", (req, res) => {
  var book = {};
  book.id = shortId.generate();
  book.title = req.body.title;
  book.decription = req.body.decription;
  console.log(book);

  db.get("books")
    .push(book)
    .write();
  res.redirect("/books");
});
app.get("/books", (req, res) => {
  var q = req.query.q;
  if (!q) {
    res.render("books/index", { books: books.value() });
  } else {
    var matchBook = books.filter(book => {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("books/index", { books: matchBook.value(), keyword: q });
  }
});
app.get("/books/:id", (req, res) => {
  var id = req.params.id;
  var book = books.find({ id: id }).value();
  res.render("books/view", { books: book });
});
app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  books.remove({ id: id }).write();
  res.redirect("/books");
});
app.get("/books/:id/update", (req, res) => {
  var id = req.params.id;

  res.render("books/update", { books: books.value(), id: id });
});
app.post("/books/:id/update", (req, res) => {
  var id = req.body.id;
  console.log(id);
  books
    .find({ id: id })
    .assign({ title: req.body.title, decription: req.body.decription })
    .write();
  res.redirect("/books");
});

app.use('/users',routeUser);
app.listen(3000, () => {
  console.log("Day la port : " + 3000);
});