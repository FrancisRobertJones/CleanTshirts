const ContainsLineItems = require("./ContainsLineItems")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"
    }


    setData(inputData) {
        this._name = inputData.name,
        this._price = inputData.price,
        this._image1 = inputData.image1,
        this._image2 = inputData.image2,
        this._amountInStock = inputData.amountInStock,
        this._description = inputData.description,
        this._category = inputData.category
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
}

module.exports = Cart