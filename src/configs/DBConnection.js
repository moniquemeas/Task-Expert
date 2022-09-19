require('dotenv').config();
const mysql = require ("mysql2");
// const sequelize = require('sequelize');

// const connection = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host:'localhost',
//     dialect:'mysql',
//     port: 3306
// });

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;
