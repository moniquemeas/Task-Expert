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
//router.get('/:id', (req, res) =>{
    //Task.findOne({
       // where: {
        //    id: req.params.id
        //},
        //attributes: ['id', 'name', 'phone', 'email','price','services', 'location', 'userImage'],
        //include: [
           // {
            //    model: User,
              //  attributes: ['username'],
           // }
       // ]
   // })
    //.then(taskData => {
       // if(!taskData){
          //  res.status(404).json({ message: 'No task found with this id' });
       // return;
      //  }
       // res.json(taskData);
   // })
   // .catch(err => {
     //   console.log(err);
    //    res.status(500).json(err);
  //  })
//});
router.get('/login', (req, res) => {
    //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
   // }
    res.render('login');
  });
  router.get('/add', (req, res) => {
    //if(req.session.loggedIn){
        //res.redirect('/');
        //return;
   // }
    res.render('add');
  });
 


module.exports = router