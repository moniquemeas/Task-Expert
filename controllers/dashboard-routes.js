const router = require('express').Router();
const sequelize = require('../config/connection');
const { Task, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Task.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'name', 'phone', 'price','services', 'location', 'userImage', 'user_id'],
    include: [
      
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
  })
    .then(dbTaskData => {
      const tasks = dbTaskData.map(task => task.get({ plain: true }));
      res.render('dashboard', { tasks, loggedIn: true, userId: req.session.user_id });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 
 

router.get('/edit/:id', (req, res) => {
  res.render('edit')
})


module.exports = router;
