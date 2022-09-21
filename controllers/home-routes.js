const router = require('express').Router();

const sequelize = require('../config/connection');
const {Task, User} = require('../models');



router.get('/', (req, res) => {
    console.log(req.session);

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




router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
  });

router.get('/register', (req, res) => {
    res.render('register')
})
  router.get('/edit', (req, res) => {
    
    res.render('edit');
 });
  
 router.get('/edit/:id', (req, res) => {
   
 res.render('edit');
 });
 router.get('/add', (req, res) => {
   res.render('add')
 })
  
 


module.exports = router