const sequelize = require('../config/connection');
const {User} = require('../models');

const userData = [
    {
        username: 'lola123',
        email: 'lola@gmail.com',
        password: '123456'
    },
    {
        username: 'frank002',
        email: 'frank@gmail.com',
        password: '123456'
    },
    {
        username: 'jay.morgan',
        email: 'jay@gmail.com',
        password: '123456'
    },
    {
        username: 'joehunter',
        email: 'joe@gmail.com',
        password: '123456'
    },
    {
        username: 'david',
        email: 'david@yahoo.com',
        password: '123456'
    },
    
]
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;