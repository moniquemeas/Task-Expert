const router = require('express').Router();
const sequelize = require('../config/connection');
const {Task, User } = require('../models');


// get all tasks for homepage
router.get('/', (req, res) => {
 
  Task.findAll({
    attributes: 
        ['id', 'name', 'phone','price','services', 'location', 'userImage'],
    include: [
      
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
  })
    .then(dbTaskData => {
      const tasks = dbTaskData.map(task => task.get({ plain: true }));

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

router.get('/task/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'phone','price','services', 'location', 'userImage'],
    include: [
      
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
  })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      const task = dbTaskData.get(task => task.get({ plain: true }));

      res.render('single-task', {
        task,
        loggedIn: req.session.loggedIn
      });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
res.render('login');
});



router.get('/register', (req, res) =>{
  res.render('register')
});


router.get('/edit/:id', (req, res) => {
  res.render('edit')
})
module.exports = router;