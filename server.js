const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const db=require('./db');
const books=db.get('books');
const app = express();

const routeUser=require('./routes/users.route');
const routeTrans=require('./routes/transactions.route');
const routeBooks=require('./routes/books.route')
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users',routeUser);
app.use('/trans',routeTrans);
app.use('/books',routeBooks);
app.listen(3000, () => {
  console.log("Day la port : " + 3000);
});