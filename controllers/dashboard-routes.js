const router = require('express').Router();

const sequelize = require('../config/connection');
const {Task, User} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', (req, res) => {
    console.log(req.session);
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
router.get('/search', (req, res) => {
    let {term} = req.query;

    Task.findAll({
        where: {
            location: {[Op.like]: '%' + term + '%'}
        }
    })
    .then(taskData => console.log(taskData))
    .then(taskData => res.render('dashboard', {taskData}))
    .catch(err => res.render('error', {error: err}));
})

module.exports = router;
