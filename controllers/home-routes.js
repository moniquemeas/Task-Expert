const router = require('express').Router();
const sequelize = require('../config/connection');
const {Task, User} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
        
        res.render('homepage', {
            tasks,
            loggedIn: req.session.loggedIn

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.get('/login', (req, res) => {
 //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
    //}
    res.render('login');
  });
  router.get('/search', (req, res) => {
    let {term} = req.query;

    Task.findAll({
        where: {
            location: {[Op.like]: '%' + term + '%'}
        }
    })
    .then(taskData => console.log(taskData))
    .then(taskData => res.render('homepage', {taskData}))
    .catch(err => res.render('error', {error: err}));
});
  //router.get('/logout', (req, res) => {
    
  // res.render('/')
//});
router.get('/register', (req, res) =>{
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('register')
});
router.get('/add', (req, res) => {
    res.render('add')
  });
  router.get('/edit/:id', (req, res) => {
   
    res.render('edit');
   });

module.exports = router