const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const TokenModel = require('./TokenModel');

const UserModel = sequelize.define('users', {
    name: {type: DataTypes.STRING, allowNull:false},
    surname: {type: DataTypes.STRING, allowNull:false},
    email: {type: DataTypes.STRING, allowNull:false, unique: true},
    password:  {type: DataTypes.STRING, allowNull:false},
    date: {type: DataTypes.DATEONLY, allowNull: false, },
    activationLink : {type: DataTypes.UUID },
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
}, {timestamps: false})
UserModel.hasOne(TokenModel, {foreignKey: {userId: "id"}})
module.exports = UserModel;