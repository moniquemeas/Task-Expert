const User = require('./User');
const Task = require('./Task');

User.hasMany(Task, {
    foreignKey: 'user_id'
});
Task.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})


module.exports = {User, Task};