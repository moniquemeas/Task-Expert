const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bars = require('express-handlebars');
const loStrategy = require('passport-local').Strategy;
const connection = require("./db/connection")
const app = express();

// const PORT = process.env.PORT || 3001;

connection.query('USE user_database');

connection.connect(function (err) {
    if (err) throw err;
    console.log("Succesfully Connected");
})

//Middleware

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
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize's the user from the session
passport.deserializeUser(function (id, done) {
    connection.query("select * from users where id = " + id, function (err, rows) {
        done(err, rows[0]);
    });
});

//Local Signup

passport.use('local-signup', new loStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    connection.query("select * from login_user where email = '"+email+"'",function(err,rows){
        console.log(rows);
        console.log("above row object");
        if (err)
            return done(err);
         if (rows.length) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // if there is no user with that email
            // create the user
            const newUserMysql = new Object();
            
            newUserMysql.email    = email;
            newUserMysql.password = password; // use the generateHash function in our user model
        
            const insertQuery = "INSERT INTO login_user ( email, password ) values ('" + email +"','"+ password +"')";
                console.log(insertQuery);
            connection.query(insertQuery,function(err,rows){
            newUserMysql.id = rows.insertId;
            
            return done(null, newUserMysql);
            });	
        }	
    });
}));


// passport.use(new loStrategy(function (username, password, done) {
//     user.findOne({
//         username: username
//     }, function (err, user) {
//         if (err) return done(err);
//         if (!user) return done(null, false, {
//             message: 'Incorrect username!'
//         });

//         bcrypt.compare(password, user.password, function (err, res) {
//             if (err) return done(err);
//             if (res === false) {
//                 return done(null, false, {
//                     message: 'Incorrect Password!'
//                 });
//             }

//             return done(null, user);
//         });
//     });
// }));