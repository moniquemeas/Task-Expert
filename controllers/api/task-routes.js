const router = require('express').Router();
const {User, Task} = require('../../models');

//get all tasks
router.get('/', (req, res) => {
    Task.findAll({
        attributes: ['id','price','services', 'location'],
        include:[
            {
                model: User,
                attributes: ['username', 'name', 'phone', 'email']
            }
        ]
    })
    .then(taskData => res.json(taskData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//get task by id
router.get('/:id', (req, res) =>{
    Task.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','price','services', 'location'],
        include: [
            {
                model: User,
                attributes: ['username', 'name', 'phone', 'email']
            }
        ]
    })
    .then(taskData => {
        if(!taskData){
            res.status(404).json({ message: 'No task found with this id' });
        return;
        }
        res.json(taskData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//create new task
router.post('/', (req, res) => {
   
    Task.create({
        
        price: req.body.price,
        services: req.body.services,
        location: req.body.location,
        user_id: req.body.user_id
    })
    .then(taskData => res.json(taskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    

});

//update task by id
router.put('/:id', (req, res) => {
    Task.update({
        price: req.body.price,
        services: req.body.services,
        location: req.body.location,
        user_id: req.body.user_id
    },
    {
        where:{
            id:req.params.id
        }
    }
    )
    .then(taskData => {
        if (!taskData) {
          res.status(404).json({ message: 'No task found with this id' });
          return;
        }
        res.json(taskData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

});
//delete task by id
router.delete('/:id', (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(taskData => {
        if (!taskData) {
          res.status(404).json({ message: 'No task found with this id' });
          return;
        }
        res.json(taskData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

});
module.exports = router;