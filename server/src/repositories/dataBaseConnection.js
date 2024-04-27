const mongodb = require("mongodb");
const { LineItemsDb } = require("../models/lineItemsDb");

let instance = null;

class DatabaseConnection {
    constructor() {
        this.client = null;
        this.url = null;
        this.debugId = Math.floor(Math.random() * 1000000)
    }

    static getInstance() {
        if (!instance) {
            instance = new DatabaseConnection()
        }
        return instance
    }

    setUrl(url) {
        this.url = url
    }

    async connect() {
        if (!this.client) {
            this.client = new mongodb.MongoClient(this.url);
            await this.client.connect()
            console.log("DB connected" + this.debugId)
        }
        return this.client.db("shop")
    }

    async getAll(aCollection) {
        await this.connect();
        let db = this.client.db("shop");
        const collection = db.collection(aCollection)
        let pipeline = [];
        let documents = collection.aggregate(pipeline);
        let returnArray = [];
        for await (const document of documents) {
            returnArray.push(document)
        }
        console.log(returnArray)
        return returnArray
        
    }

async create(aCollection, aData) {

        try {
            await this.connect()
            let db = this.client.db("shop");
            const collection = db.collection(aCollection)
            if (aData._id === undefined) {
                delete aData._id; 
            }
            console.log("this is data in repo", aData)
            const newCreate = await collection.insertOne(aData)
            return newCreate
        }
        catch (error) {
            console.error('Failed to create', error);
            throw new Error('Failed to create');
        }
    }

    async edit(aCollection, aId, aData) {
        try {
            await this.connect()
            let db = this.client.db("shop");
            const collection = db.collection(aCollection)
            const editedItem = await collection.updateOne({ "_id": new mongodb.ObjectId(aId) }, {
                "$set": {
                    ...aData
                }
            })
            return editedItem
        }
        catch (error) {
            console.error('Failed to edit:', error);
            throw new Error('Failed to edit product');
        }
    }

    async delete(aCollection, aId) {
        try {
            await this.connect()
            let db = this.client.db("shop");
            const collection = db.collection(aCollection)
            console.log(aId)

            const result = await collection.deleteOne({ "_id": new mongodb.ObjectId(aId) });
            return result
        }
        catch (error) {
            console.error('Failed to delete product:', error);
            throw new Error('Failed to delete product');
        }
    } 
}

module.exports = DatabaseConnection