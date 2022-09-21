const {Task} = require('../models');

const taskData = [
    {
        userImage:'images/1663492071464.jpg',
        name: 'Lola White',
        phone: '123-578-5032',
        email: 'lola@gmail.com',
        price: '15',
        services: 'babasitter',
        location: 'Orlando',
        user_id: '4'
    },
    {
        userImage:'images/1663492167347.jpg',
        name: 'Frank Johnson',
        phone: '123-578-5000',
        email: 'frank@gmail.com',
        price: '40',
        services: 'mover',
        location: 'Daytona',
        user_id: '2'
    },
    {
        userImage:'images/1663492224107.jpg',
        name: 'Jay Morgan',
        phone: '123-578-5025',
        email: 'jay@gmail.com',
        price: '25',
        services: 'lawn service',
        location: 'Orlando',
        user_id: '3'
    },
    {
        userImage:'images/1663492245240.jpg',
        name: 'Joe Hunter',
        phone: '123-578-0032',
        email: 'joe@gmail.com',
        price: '50',
        services: 'plumber',
        location: 'Tampa',
        user_id: '1'
    },
    {
        userImage:'images/1663492259971.jpg',
        name: 'David Donald',
        phone: '123-578-1000',
        email: 'david@gmail.com',
        price: '55',
        services: 'mover',
        location: 'Orlando',
        user_id: '6'
    },
    {
        userImage:'images/1663492281568.jpg',
        name: 'Jack McKinnon',
        phone: '123-578-2000',
        email: 'jack@gmail.com',
        price: '15',
        services: 'dogsitter',
        location: 'Orlando',
        user_id: '7'
    },
    {
        userImage:'images/1663492294644.jpg',
        name: 'Jojo Lennen',
        phone: '123-578-3654',
        email: 'jojo@gmail.com',
        price: '40',
        services: 'housekeeper',
        location: 'Orlando',
        user_id: '5'
    }
    
]

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
