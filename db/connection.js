const mysql = require('mysql2');

//Connects to the database
const connection = mysql.createConnection({
    host: "process.env.DB_HOST",
    user: "process.env.DB_USERNAME",
    password: "process.env.DB_PASSWORD",
    database: "process.env.DB_NAME"
});

//Console logs Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Succesfully Connected");
})

module.exports = connection;