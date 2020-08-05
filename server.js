const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);
const books = db.get("books");
db.defaults({ books: [] ,users:[]}).write();

const app = express();
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
app.listen(3000, () => {
  console.log("Day la port : " + 3000);
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

const users=db.get('users');
app.get('/users',(req,res)=>{
    res.render('users/index',{users:users.value()});
})
app.get('/users/create',(req,res)=>{
  res.render('users/create',{users:users.value()});
});
app.post('/users/create',(req,res)=>{
  var userName={};
  userName.id=shortId.generate();
  userName.name=req.body.name;
  console.log(userName);
  users.push(userName).write();
  res.redirect('/users');
});
app.get('/users/:id',(req,res)=>{
  var id=req.params.id;
  var user=users.find({id:id}).value();
  console.log(user);
  res.render('users/view',{users:user});
});
app.get('/users/:id/update',(req,res)=>{
  var id=req.params.id;
  var user=users.find({id:id}).value();
  res.render('users/update',{users:user,id:id});
});
app.post('/users/:id/update',(req,res)=>{
  var id=req.body.id;
  var name=req.body.name;
  users.find({id:id}).assign({name:name}).write();
  res.redirect('/users');
});
app.get('/users/:id/delete',(req,res)=>{
  var id=req.params.id;
  users.remove({id:id}).write();
  res.redirect('/users');
})