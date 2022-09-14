const express = require('express');
const sequelize = require('./config/connection');



const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(require('./controllers'));







sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log('Server is running on port 3001.'))
});