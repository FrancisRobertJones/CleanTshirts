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
            const userCredentials = req.body
            const authSuccess = await this.authService.signIn(userCredentials)
            if (authSuccess) { 
                const userDetails = await this.authService.getUserDetails(userCredentials.email);

                req.session.user = { 
                    userId: userDetails._id,
                    address: userDetails.address,
                    state: userDetails.state,
                    country: userDetails.country,
                    postcode: userDetails.postcode
                 }
                res.status(200).json({ success: "user has been authed" }) 
            } 
            else { 
                res.status(401).json({ denied: "incorrect credentials" }) 
            }
        } catch (error) {
            if (error.message === "User doesn't exist") {
                res.status(409).json({ message: error })
                console.log("User doesn't exist")
            } else {
                console.log("unknown auth error at controller level", error)
                res.status(400).json({ "problem logging in user ": error })
            }
        }
    }

    logout = async (req, res) => {
        try {
            req.session.destroy(() => {
                res.status(200).json({ message: "Successfully logged out" });
            });
        } catch(error) {
            console.log("Problem logging out: ", error);
            res.status(500).json({ error: "Failed to log out" });
        }
    }

    authCheck = async (req, res) => {
        console.log(">>>>>>>>>>>> checking")
        if (req.session && req.session.user) {
            res.status(200).json({ isAuthenticated: true, user: req.session.user });
        } else {
            res.status(401).json({ isAuthenticated: false });
        }
    }
}



module.exports = AuthController