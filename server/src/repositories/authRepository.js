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
            const userExists = await collection.findOne({_id: email})
            return userExists
        } catch (error) {
            console.log("error finding user", error)
        }
    }

    async createUser(userData) {
        try {

        } catch (error) {

        }
    }
}


module.exports = AuthRepository