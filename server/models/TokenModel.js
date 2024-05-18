const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const TokenModel = sequelize.define('tokens', {
    userId: {type: DataTypes.INTEGER},
    refreshToken: {type: DataTypes.STRING(1000), allowNull:false}
}, {timestamps: false})

module.exports = TokenModel;