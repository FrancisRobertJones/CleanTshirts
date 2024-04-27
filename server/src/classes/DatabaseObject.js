const mongodb = require("mongodb");
const DatabaseConnection = require('../repositories/dataBaseConnection')


class DatabaseObject {
    constructor() {
        this.collection = null;
        this.id = null;
    }

    setId(id) {
        this.id = id
    }


    setObjectId(idString) {
        this.id = new mongodb.ObjectId(idString);
        return this
    }

    getSaveData() {
        console.warn("should be overriden")
        return {}
    }

    async save() {
        const data = this.getSaveData()
        return await DatabaseConnection.getInstance().save(this.collection, this.id, data);

    }

    getAll() {
        const resData = DatabaseConnection.getInstance().getAll(this.collection)
        return resData
    }


    delete() {
        const response = DatabaseConnection.getInstance().delete(this.collection, this.id)
        return response
    }

    getObjectId(id){
        if(id instanceof mongodb.ObjectId){
            return id
        }
        return new mongodb.ObjectId(id); 
    }
}

module.exports = DatabaseObject;