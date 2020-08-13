const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const db=require('./db');
const books=db.get('books');
const app = express();

const routeUser=require('./routes/users.route');
const routeTrans=require('./routes/transactions.route');
const routeBooks=require('./routes/books.route')
const cookies=require('./validates/cookies');
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cookie',(req,res,next)=>{
  res.cookie('user','123123');
  next();
});
app.use('/users',cookies.cookies,routeUser);
app.use('/trans',cookies.cookies,routeTrans);
app.use('/books',cookies.cookies,routeBooks);
app.listen(3000, () => {
  console.log("Day la port : " + 3000);
});