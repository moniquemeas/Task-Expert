const router = require('express').Router();
const path = require('path');
const {User} = require('../../models');
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

//get all users
router.get('/', (req, res) =>{
User.findAll({
    attributes:{exclude:['password']}
})
.then(userData => res.json(userData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})

});
//get user by id
router.get('/:id', (req, res) =>{
User.findOne({
    attributes: {exclude: ['password']},
    where: {
        id:req.params.id
    }
})
.then(userData => {
    if(!userData) {
        res.status(404).json ({message: 'No user found with this id.'})
        return;
    }
    res.json(userData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
})
});

//create user
router.post('/',upload, (req, res) => {
    
User.create({
    username: req.body.username,
    password: req.body.password,
    userImage: req.file.path,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
})

.then(userData => res.json(userData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//update user by id
router.put('/:id',upload, (req, res) => {
    User.update(req.body, 
        {
            individualHooks: true,
            where:{
                id:req.params.id
            }
        },
           {
        userImage: req.file.path,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    
)
.then(userData => {
    if(!userData[0]) {
        res.status(404).json({message: 'No user found with this id.'});
        return;
    }
    res.json(userData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData){
            res.status(404).json({message: 'No user found with this id.'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;