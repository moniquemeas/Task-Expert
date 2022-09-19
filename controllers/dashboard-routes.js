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


module.exports = router