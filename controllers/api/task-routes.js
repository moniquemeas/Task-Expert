const router = require('express').Router();
const {User, Task} = require('../../models');
const path = require('path');
const multer = require('multer');


//create storage to for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))

    }
});

//function to upload images
const upload = multer({
    storage: storage,
    //limit filesize to 1gig
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        //set file type
        const fileType = /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Invalid file type.')
    }
}).single('userImage')




//get all tasks
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
        attributes: ['id', 'name', 'phone', 'email','price','services', 'location', 'userImage'],
        include: [
            {
                model: User,
                attributes: ['username'],
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
router.post('/',upload, (req, res) => {
    if (req.session){
        const re = /\\/gi;
        const newFile = req.file.path.replace(re, '/');
        const imageFile = newFile.replace('public/', '');
        console.log(newFile);
        console.log(imageFile)
        Task.create({
            userImage: imageFile,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
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
    }
    
    

});

//update task by id
router.put('/:id',upload, (req, res) => {
  
    const re = /\\/gi;
    const newFile = req.file.path.replace(re, '/');
    const imageFile = newFile.replace('public/', '');
    console.log(newFile);
    console.log(imageFile)
    Task.update({
        userImage: imageFile,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
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