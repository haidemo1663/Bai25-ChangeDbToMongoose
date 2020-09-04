require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var mongoose=require('./middleware/mongoose.connection');
app.use(mongoose);
app.use(cookieParser(process.env.COOKIES_PARSER));
const sessionMiddleware=require('./middleware/session.middleware');
app.use(sessionMiddleware);
const localStorageMiddleware=require('./middleware/localStorage.middleware');
app.use(localStorageMiddleware);
const author=require('./validates/auth.validate');
const routeUser=require('./routes/users.route');
const routeBooks=require('./routes/books.route');
const routeIndex=require('./routes/index.route');
const routeCart=require('./routes/cart.route');
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routeIndex);
app.use('/cart',routeCart);
app.use('/users',author.postLogin,routeUser);
app.use('/books',routeBooks);
app.listen(3000,(req,res) => {
  console.log("Day la port : " + 3000);
});