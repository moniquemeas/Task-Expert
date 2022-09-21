const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//Load User Model
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
            //Match user
            User.findOne({
                
                  username: username
                
              })
              .then(user => {
                if(!user){
                    return done(null, false, {message: 'Invalid username!'})
               }
                //match password
               bcrypt.compare(password, user.password, (err, isMatch) => {
                  if(err) throw err;

                  if(isMatch) {
                       return done(null, user);
                   } else {
                       return done(null, false, {message: 'Invalid passwor!'})
                 }
                }); 
             })
             .catch(err => console.log(err));
        })
    );

   passport.serializeUser(function(user, done){
       
   });
   passport.deserializeUser(function(id, done) {
      
    })
}