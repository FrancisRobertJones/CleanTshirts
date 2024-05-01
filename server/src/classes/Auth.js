const AuthRepository = require('../repositories/authRepository')
const Cart = require('../classes/Cart')
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
                console.log(userData)
                const saltRounds = 10;
                const passUnhashed = userData["password"]
                const passHashed = await bcrypt.hash(passUnhashed, saltRounds)
                const userDataHashed = { ...userData, password: passHashed }
                const newUser = await this.authRepository.createUser(userDataHashed)
                await this.createCartForUser(newUser.insertedId)
                return newUser
            } catch (error) {
                console.log("there has been an error creating the user", error)
                throw new Error("Problem creating user", error)
            }
        }
    }

    async createCartForUser(userId) {
        const newCart = new Cart()
        newCart.setUserId(userId)
        newCart.lineItems = []
        newCart.getSaveData()
        newCart.save()
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
                const unhashedPass = userData["password"]

                const authSuccess = await bcrypt.compare(unhashedPass, hashedPass)
                return authSuccess

            } catch (error) {
                console.log("there has been an error logging the user in", error)
                throw new Error("Problem logging in")
            }
        }
    }

    async getUserDetails(email) {
        const user = await this.authRepository.findUser(email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

}


module.exports = AuthService