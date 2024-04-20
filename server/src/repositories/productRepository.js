const DatabaseConnection = require("../dataBase/DatabaseConnection")
const mongodb = require("mongodb")

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
        let pipeline = [];
        let documents = collection.aggregate(pipeline);
        let returnArray = [];
        for await (const document of documents) {
            returnArray.push(document)
        }
        console.log(returnArray)
        return returnArray
    }

    async create(productData) {
        try {
            await this.connect()
            const collection = this.db.collection('products')

            const newProduct = await collection.insertOne({ 
                "status": productData["status"], 
                "name": productData["name"], 
                "price": productData["price"], 
                "image": productData["image"],
                "amountInStock": productData["amountInStock"],
                "description": product["description"] 
            })
            return newProduct
        }
        catch (error) {
            console.error('Failed to create product:', error);
            throw new Error('Failed to create product');
        }
    }

    async edit(id, productData) {
        try {
            await this.connect()
            const collection = this.db.collection('products')

            const updatedProduct = await collection.updateOne({ "_id": new mongodb.ObjectId({ id }) }, {
                "$set": {
                    "name": productData["name"],
                    "description": productData["description"],
                    "amountInStock": productData["amountInStock"],
                    "status": productData["status"],
                    "price": productData["price"],
                    "image": productData["image"]
                }
            })
            return updatedProduct
        }
        catch (error) {
            console.error('Failed to create product:', error);
            throw new Error('Failed to create product');
        }
    }
}






module.exports = ProductRepository