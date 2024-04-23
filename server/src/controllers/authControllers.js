const AuthService = require('../classes/Auth')

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    createUser = async (req, res) => {
        try {
            const userData = req.body;
            const user = await this.authService.createUser(userData)
            res.status(200).json(user)
            console.log("user created", user)
        } catch (error) {
            if (error.message === 'User already exists') {
                res.status(409).json({ message: error })
                console.log("user already exists!", error)
            } else {
                res.status(400).json({ message: error })
                console.log("problem creating user", error)
            }
        }
    }

    logIn = async (req, res) => {
        try {
            const userData = req.body
            const authSuccess = await this.authService.signIn(userData)
            authSuccess ? res.status(200).json({ success: "user has been authed" }) : res.status(400).json({ denied: "incorrect credentials"})
        } catch (error) {
            if (error.message === "User doesn't exist") {
                res.status(409).json({ message: error })
                console.log("User doesn't exist")
            } else {
                console.log("unknown auth error at controller level", error)
                res.status(400).json({ "problem creating user ":  error })
            }
        }
    }

}



module.exports = AuthController