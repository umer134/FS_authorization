const jwt = require('jsonwebtoken');
const TokenModel = require('../models/TokenModel');

class TokenService  {

    generateToken (payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
       try 
       {
        const userData = jwt.verify(token, process.env.ACCESS_SECRET);
        return userData;
       } 
       catch(e)
       {
        return null;
       }
    }

    validateRefreshToken(token) {
       try 
       {
        const userData = jwt.verify(token, process.env.REFRESH_SECRET);
        return userData
       } 
       catch(e)
       {
        return null
       }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await TokenModel.findOne({where: {userId: userId}});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await TokenModel.create({userId:userId, refreshToken})
        return token;
    }
    
    async removeToken (refreshToken) {
        const tokenData = await TokenModel.destroy({where: {refreshToken}})
        return tokenData;
    }
    async findToken (refreshToken) {
        const tokenData = await TokenModel.findOne({where: {refreshToken}})
        return tokenData;
    }
}

module.exports = new TokenService()