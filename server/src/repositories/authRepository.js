const DatabaseConnection = require("../dataBase/DatabaseConnection");

class AuthRepository {
    constructor() {
        this.dbConnection = DatabaseConnection.getInstance()
        this.dbConnection.setUrl("mongodb://localhost:27017")
    }

    async connect() {
        this.db = await this.dbConnection.connect()
    }

    async findUser(email) {
        try {
            await this.connect()
            const collection = this.db.collection('users')
            const userExists = await collection.findOne({ _id: email })
            return userExists
        } catch (error) {
            console.log("error finding user", error)
            return error
        }
    }

    async createUser(userDataHashed) {

        await this.connect()
        const collection = this.db.collection('users')
        return await collection.insertOne({
            "_id": userDataHashed["email"],
            "password": userDataHashed["password"],
            "address": userDataHashed["address"],
            "state": userDataHashed["state"],
            "country": userDataHashed["country"],
            "postcode": userDataHashed["postcode"]
        })
    }

    async getLogin(userData) {
        const { email } = userData
        await this.connect()
        const collection = this.db.collection('users')
        return await collection.findOne({ _id: email })
    }

}


module.exports = AuthRepository