const DatabaseObject = require('./DatabaseObject')


class LineItem extends DatabaseObject {
    constructor() {
        super()
        this.collection = "lineItems"
    }


    setProduct(idString) {
        this.productId = new mongodb.ObjectId(idString);
    }

    setAmount(amount) {
        this.amount = amount
    }


    setAmount() {
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



module.exports = LineItem;