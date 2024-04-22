const AuthService = require('../services/authService')

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await this.authService.createUser(userData)
            res.status(200).json(user)
            console.log("user created", user)
        } catch (error) {
            if (error.message = 'User already exists') {
                res.status(409).json(error)
                console.log("user already exists!", error)
            } else {
                res.status(400).json(error)
                console.log("problem creating user", error)
            }
        }
    }



}



module.exports = AuthController