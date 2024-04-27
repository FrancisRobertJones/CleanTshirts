const DatabaseObject = require('./DatabaseObject')

class Product extends DatabaseObject {
    constructor() {
        super()
        this.collection = "products"
    }

    setName(name){
        this._name = name
    }
    setPrice(price){
        this._price = price
    }
    setImage1(image1){
        this._image1 = image1
    }
    setImage2(image2){
        this._image2 = image2
    }
    setAmountInStock(amountInStock){
        this._amountInStock = amountInStock
    }
    setDescription(description){
        this._description = description  
    }
    setCategory(category){
        this._category = category
    }

    getName(){
        return this._name
    }

    getPrice(){
        return this._price
    }

    getSaveData() {
        let data = {
            name: this._name,
            price: this._price,
            image1: this._image1,
            image2: this._image2,
            amountInStock: this._amountInStock,
            description: this._description,
            category: this._category,
        }
        console.log("data in product", data)
        return data
    }

    async setupFromDatabase() {
        let dataBaseData = await this.getDatabaseData()

        this._name = dataBaseData["name"];
        this._price = dataBaseData["price"]
        return dataBaseData
    }
}

module.exports = Product