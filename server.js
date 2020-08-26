require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cookieParser = require('cookie-parser')
 
app.use(cookieParser(process.env.COOKIES_PARSER));

const routeUser=require('./routes/users.route');
const routeTrans=require('./routes/transactions.route');
const routeBooks=require('./routes/books.route');
const routeProduct=require('./routes/product.route');
const auth=require('./validates/auth.validate');
const routeIndex=require('./routes/index.route');
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routeIndex)
app.use('/users',auth.postLogin,routeUser);
app.use('/trans',auth.postLogin,routeTrans);
app.use('/books',auth.postLogin,routeBooks);
app.use('/products',routeProduct);
app.listen(3000, (req,res) => {
  console.log("Day la port : " + 3000);
});