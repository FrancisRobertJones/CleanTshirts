const AuthRepository = require('../repositories/authRepository')

class AuthService {
    constructor() {
        this.authRepository = new AuthRepository()
    }


    async createUser(userData) {
        const { email } = userData
        const userExistsCheck = await this.authRepository.findUser(userData.email)
        if (userExistsCheck) {
            throw new Error('User already exists')
        }
        //check if user exists
        //if user doesn't exist, then create a user

    }
}


module.exports = AuthService