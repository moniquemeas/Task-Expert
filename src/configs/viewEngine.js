const express =  require ("express");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

/**
 * Config view engine for app
 */
let configViewEngine = (app)=> {
    app.use(express.static("./src/public"));
    app.engine('handlebars', hbs.engine);
    app.set("view engine", "handlebars");
    app.set("views","./src/views");
};

module.exports = configViewEngine;
