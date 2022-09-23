const {Task} = require('../models');

const taskData = [
    {
        userImage:'images/1663492071464.jpg',
        name: 'Lola White',
        phone: '123-578-5032',
        price: '15',
        services: 'babasitter',
        location: 'Orlando',
        user_id: '1'
    },
    {
        userImage:'images/1663492167347.jpg',
        name: 'Frank Johnson',
        phone: '123-578-5000',
        price: '40',
        services: 'mover',
        location: 'Daytona',
        user_id: '2'
    },
    {
        userImage:'images/1663492224107.jpg',
        name: 'Jay Morgan',
        phone: '123-578-5025',
        price: '25',
        services: 'lawn service',
        location: 'Orlando',
        user_id: '3'
    },
    {
        userImage:'images/1663492245240.jpg',
        name: 'Joe Hunter',
        phone: '123-578-0032',
        price: '50',
        services: 'plumber',
        location: 'Tampa',
        user_id: '4'
    },
    {
        userImage:'images/1663492259971.jpg',
        name: 'David Donald',
        phone: '123-578-1000',
        price: '55',
        services: 'mover',
        location: 'Orlando',
        user_id: '5'
    }
    
]

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
