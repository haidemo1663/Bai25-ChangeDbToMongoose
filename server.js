const express = require("express");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const db=require('./db');
const books=db.get('books');
const app = express();
var cookieParser = require('cookie-parser')
 
app.use(cookieParser())

const routeUser=require('./routes/users.route');
const routeTrans=require('./routes/transactions.route');
const routeBooks=require('./routes/books.route')
const cookies=require('./validates/cookies');
const auth=require('./validates/auth.validate');
const routeIndex=require('./routes/index.route');
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routeIndex)
app.use('/users',auth.postLogin,auth.authUserValidate,routeUser);
app.use('/trans',auth.postLogin,routeTrans);
app.use('/books',auth.postLogin,routeBooks);
app.listen(3000, (req,res) => {
  console.log("Day la port : " + 3000);
});