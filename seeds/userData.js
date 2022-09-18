const sequelize = require('../config/connection');
const {User} = require('../models');

const userData = [
    {
        username: 'lola123',
        password: '123456'
    },
    {
        username: 'frank002',
        password: '123456'
    },
    {
        username: 'jay.morgan',
        password: '123456'
    },
    {
        username: 'joehunter',
        password: '123456'
    },
    {
        username: 'david',
        password: '123456'
    },
    {
        username: 'jack',
        password: '123456'
    },
    {
        username: 'jojo',
        password: '123456'
    },
]
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;