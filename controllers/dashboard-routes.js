const router = require('express').Router();

const sequelize = require('../config/connection');
const {Task, User} = require('../models');
const withAuth = require('../utils/auth');



router.get('/',withAuth, (req, res) => {

    console.log('==============')
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
     
        
        res.render('dashboard', {
            tasks,
            layout: 'dashboard'

        });
        
    })
    
  
});
router.get('/dasboard/add', (req, res) => {
    res.render('add')
});






module.exports = router;
