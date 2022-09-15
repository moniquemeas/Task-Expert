const router = require('express').Router();
const {User} = require('../../models');

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
router.post('/', (req, res) => {
User.create({
    username: req.body.username,
    password: req.body.password,
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
router.put('/:id', (req, res) => {
    User.update(req.body, 
        {
            where:{
                id:req.params.id
            }
        },
           {
        
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