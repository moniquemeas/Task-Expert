const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

// create Task model
class Task extends Model {}

Task.init({
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
    email:{
        type:DataTypes.STRING,
        allowNull:false,

        validate:{
            isEmail:true
        }
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
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'task'
});
module.exports = Task;