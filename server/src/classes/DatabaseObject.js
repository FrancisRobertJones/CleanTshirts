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

    save() {
        const data = this.getSaveData()
        if (this.id) {
            return DatabaseConnection.getInstance().edit(this.collection, this.id, data);
        } else {
            return DatabaseConnection.getInstance().create(this.collection, data);
        }
    }

    getAll() {
        const resData = DatabaseConnection.getInstance().getAll(this.collection)
        return resData
    }


    delete() {
        const response = DatabaseConnection.getInstance().delete(this.collection, this.id)
        return response
    }
}

module.exports = DatabaseObject;