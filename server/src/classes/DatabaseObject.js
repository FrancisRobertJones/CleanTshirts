    const mongodb = require("mongodb");
    const DatabaseConnection = require('../repositories/dataBaseConnection')


    class DatabaseObject {
        constructor() {
            this.collection = null;
            this.id = null;
        }


        setObjectId(idString) {
            this.id = new mongodb.ObjectId(idString);
            return this
        }

        getEditData() {
            console.warn("Overide getEditData");
            return {};
        }

        getCreateData() {
            console.warn("Overide getCreateData");
            return {};
        }


        getAll() {
            const resData = DatabaseConnection.getInstance().getAll(this.collection)
            return resData
        }

        create(aData) {
            let data = this.getCreateData(aData)
            console.log("About to call DatabaseConnection.create with data:", data, this.collection);
            const response = DatabaseConnection.getInstance().create(this.collection, data)
            return response
        }

        edit(aData) {
            let data = this.getEditData(aData)
            const response = DatabaseConnection.getInstance().edit(this.collection, this.id, data)
            return response
        }

        delete() {
            const response = DatabaseConnection.getInstance().delete(this.collection, this.id)
            return response
        }
    }

    module.exports = DatabaseObject;