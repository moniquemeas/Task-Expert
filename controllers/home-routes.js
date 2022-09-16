const router = require('express').Router();
const sequelize = require('../config/connection');
const {Task, User} = require('../models');

router.get('/', (req, res) => {
    Task.findAll({
        attributes: ['id','price','services', 'location'],
        include:[
            {
                model: User,
                attributes: ['username', 'name', 'phone', 'email', 'userImage']
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
    res.render('login');
  });
  router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

module.exports = router;