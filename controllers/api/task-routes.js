const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');
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


// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Task.findAll({
    attributes: [
        'id', 'name', 'phone','price','services', 'location', 'userImage'],
    include: [
     
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
  })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', upload, withAuth, (req, res) => {

    const re = /\\/gi;
    const newFile = req.file.path.replace(re, '/');
    const imageFile = newFile.replace('public/', '');
    console.log(newFile);
    console.log(imageFile)
    Task.create({
        userImage: imageFile,
        name: req.body.name,
        phone: req.body.phone,
        price: req.body.price,
        services: req.body.services,
        location: req.body.location,
        user_id: req.session.user_id
  })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



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
        
        price: req.body.price,
        services: req.body.services,
        location: req.body.location,
        user_id: req.body.user_id
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
