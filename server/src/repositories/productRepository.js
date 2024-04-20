const DatabaseConnection = require("../dataBase/DatabaseConnection")

//note to self, repositories strictly interact with database. return to servicelayer, which then passes back to controller, which then formats as needed and sends response back to client. 

class ProductRepository {
    constructor() {
        this.dbConnection = DatabaseConnection.getInstance()
        this.dbConnection.setUrl("mongodb://localhost:27017")
    }

    async connect() {
        this.db = await this.dbConnection.connect()
    }


    async findAll() {
        await this.connect();
        const collection = this.db.collection('products')
        let pipeline= [];
        let documents = collection.aggregate(pipeline);
        let returnArray = [];
        for await(const document of documents) {
            returnArray.push(document)
        }
        console.log(returnArray)
        return returnArray
    }

}



module.exports = ProductRepository