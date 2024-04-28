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
                console.log(userData)
                 const saltRounds = 10;
                 const passUnhashed = userData["password"]
                const passHashed = await bcrypt.hash(passUnhashed, saltRounds)
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
                const unhashedPass = userData["password"]

                const authSuccess = await bcrypt.compare(unhashedPass, hashedPass)
                console.log(authSuccess)


                return authSuccess

                //TODO start a session
            } catch (error) {
                console.log("there has been an error logging the user in", error)
                throw new Error("Problem logging in")
            }
        } 
    }

    async hashAndCompare() {
        // Simulate storing and retrieving hash
        const password = "testPassword123";
        const hash = await bcrypt.hash(password, 10);
        console.log("Stored hash:", hash);
    
        // Simulate retrieval and comparison
        const retrievedHash = hash; // This should be the same as 'hash'
        const comparisonResult = await bcrypt.compare(password, retrievedHash);
        console.log("Comparison result:", comparisonResult); // Should log: true
    }

    
}


module.exports = AuthService