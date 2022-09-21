const router = require('express').Router();

const {User} = require('../../models');



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
router.post('/', (req, res) => {
    
User.create({
    username: req.body.username,
    password: req.body.password
    
})

.then(userData => {
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn =true;
        res.json(userData);
    })
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//create route for login

router.post('/login',  (req, res) => {

User.findOne({
      where: {
       username: req.body.username
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'Incorrect username!' });
       return;
     }
  
      const validPassword = userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
    
        res.json({ user: userData, message: 'You are now logged in!' });
      });
   });
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});
  
//update user by id
router.put('/:id', (req, res) => {
    
    User.update(req.body, 
        {
            individualHooks: true,
            where:{
                id:req.params.id
            }
        })
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