const {Model, DataTypes} = require('sequelize');
const sequelize = require('../configs/connection');
const bcrypt = require('bcrypt');

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
    }
    
    
},

{
    hooks: {
        async beforeCreate(newData) {
            newData.password = await bcrypt.hash(newData.password, 10);
            return newData;
        },
        async beforeUpdate(updatedData){
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
            return updatedData;
        }
    },
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'user'
});
module.exports = User;