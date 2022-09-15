const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bars = require('express-handlebars');
const loStrategy = require('passport-local').Strategy;
const app = express();

const PORT = process.env.PORT || 3001;

//Connects to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "user_database"
});

connection.query('USE user_database');

connection.connect(function (err) {
    if (err) throw err;
    console.log("Succesfully Connected");
})

// const UserSchema = new mysql.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     passport: {
//         type: String,
//         required: true
//     },
// });

// const user = mysql.model('User', UserSchema);

//Middleware
app.engine('bars', bars.engine({
    extname: '.bars'
}));
app.set('view engine', 'bars');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Derialize's the user from the session
passport.deserializeUser(function(id, done) {
    connection.query("select * from users where id = "+id,function(err,rows){	
        done(err, rows[0]);
    });
});


passport.use(new loStrategy(function (username, password, done) {
    user.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username!'});

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if(res === false) { return done(null, false, {message: 'Incorrect Password!'});}

            return done(null, user);
        });
    });
}));