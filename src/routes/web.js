const express = require ("express");
const homePageController = require ("../controllers/homePageController");
const dashPageController = require("../controllers/dashPageController")
const registerController = require ("../controllers/registerController");
const loginController = require ("../controllers/loginController");
const auth = require ("../validation/authValidation");
const passport = require ("passport");
const initPassportLocal = require ("../controllers/passportLocalController");

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/dashboard', loginController.checkLoggedIn, dashPageController.loginDash);
    router.get("/", homePageController.handleHelloWorld);
    router.get('/', (req, res) => {
        Task.findAll({
            attributes: ['id', 'name', 'phone', 'email','price','services', 'location', 'userImage'],
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(taskData => {
            const tasks = taskData.map(task => task.get({plain: true}));
            console.log(tasks);
            res.render('homepage', {
                tasks
    
            });
        })
        
    });
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
