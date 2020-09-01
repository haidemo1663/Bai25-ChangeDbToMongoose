require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cookieParser = require('cookie-parser')
var mongoose=require('mongoose');
mongoose.connect(process.env.MONGOOSE_URL);
app.use(cookieParser(process.env.COOKIES_PARSER));
const sessionMiddleware=require('./middleware/session.middleware');
app.use(sessionMiddleware);
const routeUser=require('./routes/users.route');
const routeTrans=require('./routes/transactions.route');
const routeBooks=require('./routes/books.route');
const auth=require('./validates/auth.validate');
const routeIndex=require('./routes/index.route');
const routeCart=require('./routes/cart.route');
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routeIndex);
app.use('/cart',routeCart);
app.use('/users',auth.postLogin,routeUser);
app.use('/trans',routeTrans);
app.use('/books',routeBooks);
app.listen(3000, (req,res) => {
  console.log("Day la port : " + 3000);
});