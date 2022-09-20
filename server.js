const express = require('express');

const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');



const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Secret session',
    cookie:{},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hbs = exphbs.create({});
// middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./controllers'));

//create static folder
app.use(express.static(path.join(__dirname, 'public')));






sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log('Server is running on port 3001.'))
});





