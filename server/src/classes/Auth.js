const AuthRepository = require('../repositories/authRepository')
const bcrypt = require('bcrypt');


class AuthService {
    constructor() {
        this.authRepository = new AuthRepository()
    }


    async createUser(userData) {
        const { email } = userData
        const userExistsCheck = await this.authRepository.findUser(email)
        if (userExistsCheck) {
            throw new Error('User already exists')
        } else {
            try {
                const passUnhashed = userData["password"]
                const passHashed = await bcrypt.hash(passUnhashed, 10)
                const userDataHashed = { ...userData, password: passHashed }
                const newUser = await this.authRepository.createUser(userDataHashed)
                return newUser
            } catch (error) {
                console.log("there has been an error creating the user", error)
                throw new Error("Problem creating user", error)
            }
        }

    }

    async signIn(userData) {
        const { email } = userData
        const userExistsCheck = await this.authRepository.findUser(email)
        if (!userExistsCheck) {
            throw new Error("User doesn't exist")
        } else {
            try {
                const userCredentials = await this.authRepository.getLogin(userData)
                const hashedPass = userCredentials["password"]
                const authSuccess = bcrypt.compare(userData["password"], hashedPass)
                return authSuccess
                //TODO start a session
            } catch (error) {
                console.log("there has been an error logging the user in", error)
                throw new Error("Problem logging in", error)
            }
        }
    }
}


module.exports = AuthService