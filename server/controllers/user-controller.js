const ApiError = require("../exceptions/api-error");
const userService = require("../services/user-service")
const {validationResult} = require('express-validator')

class UserController {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
               return next(ApiError.BadRequest("validation error", errors.array())) 
            }
            const {name, surname, email, password, date} = req.body
            const userData = await userService.registration(name, surname, email, password, date);
            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30 * 24 * 60* 60 * 1000, httpOnly: true} )
            return res.json(userData)
        }
        catch(e)
        {
            next(e)
        }
    }
    async login (req, res, next) {
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60* 60 * 1000, httpOnly: true} )
            return res.json(userData)
        }
        catch(e)
        {
            next('error: ', e)
        }
    }
    async logout (req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        }
        catch(e)
        {
            next('error: ', e)
        }
    }
    async activate (req, res, next) {
        try{
        const activationLink = req.params.link;
        await userService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL)
        }
        catch(e)
        {
            next('error: ', e)
        }
    }
    async refresh (req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30 * 24 * 60* 60 * 1000, httpOnly: true} );
            return res.json(userData)
        }
        catch(e)
        {
            next('error: ', e)
        }
    }
    async getUsers (req, res, next) {
        try{
            const users = await userService.getAllUsers()
            res.json(users)
        }
        catch(e)
        {
            next('error: ', e)
        }
    }

}

module.exports = new UserController()