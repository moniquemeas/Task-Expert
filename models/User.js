const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create User model

class User extends Model {}

//create table

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[6]
        }
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
        unique:true,
        validate:{
            isEmail:true
        }
    }

},
{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'user'
});
module.exports = User;