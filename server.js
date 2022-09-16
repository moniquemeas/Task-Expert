const express = require("express");
const bars = require('express-handlebars');
const connection = require("./db/connection")
const initWeb = require("./routes/web");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const connection = require("./db/connection");
const initIndexR = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

connection.query('USE user_database');

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Config view engine
app.engine('bars', bars.engine({
    extname: '.bars'
}));
app.set('view engine', 'bars');

//Passport
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initIndexR(app);
