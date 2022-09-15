const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./controllers'));

//create static folder
app.use(express.static(path.join(__dirname, 'public')));







sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log('Server is running on port 3001.'))
});