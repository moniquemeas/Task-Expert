const router = require('express').Router();

const sequelize = require('../config/connection');
const {Task, User} = require('../models');



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
router.get('/dashboard', (req, res) => {
    Task.findAll({
        attributes: ['id', 'name', 'phone', 'email','price','services', 'location', 'userImage', 'user_id'],
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(taskData => {
        const tasks = taskData.map(task => task.get({plain: true}));
        const task = tasks.pop();
        
        console.log(tasks);
       
        res.render('dashboard', {
            task

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  
});



router.get('/login', (req, res) => {
    //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
   // }
    res.render('login');
  });

router.get('/register', (req, res) => {
    res.render('register')
})
  router.get('/edit', (req, res) => {
    //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
   // }
    res.render('edit');
  });
  
  router.get('/edit/:id', (req, res) => {
    //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
   // }
    res.render('edit');
  });
  router.get('/add', (req, res) => {
    res.render('add')
  })
  
 


module.exports = router