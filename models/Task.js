const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Task model
class Task extends Model {}

// create fields/columns for Task model
Task.init(
  {
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    userImage:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: false,
    },    
    price: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    services:{
        type:DataTypes.STRING,
        allowNull: false
    },
    
    location: {
        type:DataTypes.STRING,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key: 'id'
        }
    }
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'task'
  }
);

module.exports = Task;
