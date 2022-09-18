const seedUsers = require('./userData');
const seedTasks = require('./taskData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('-------------');
    await seedUsers();
    console.log('--------------');
    await seedTasks();

    process.exit(0);
};
seedAll();