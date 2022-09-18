const express = require('express');
const sequelize = require('./configs/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const upload = require('express-fileupload');
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('./controllers'));

// create static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(upload())

//Config Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Server is running on port 3001.'))
});
