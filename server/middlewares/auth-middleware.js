const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
    try 
    {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }
        const accesstoken = authorizationHeader.split(' ')[1];
        if(!accesstoken){
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accesstoken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    }
    catch (e)
    {
        return next(ApiError.UnauthorizedError());
    }
}