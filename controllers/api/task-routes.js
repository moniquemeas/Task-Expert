const router = require('express').Router();
const {User, Task} = require('../../models');
//const multer = require('multer');
//const upload = multer({dest: 'upload/'})


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