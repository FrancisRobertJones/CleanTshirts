const DatabaseObject = require('./DatabaseObject')
const Product = require('./Product')
const mongodb = require('mongodb')


class LineItem extends DatabaseObject {
    constructor() {
        super()
        this.collection = "lineItems"
        this._quantity = 0;
        this.name = null;
        this.price = null;
        this.description = null
    }

    setProductId(productId) {
        this.productId = this.getObjectId(productId)
        console.log(productId)
    }
    setQuantity(quantity) {
        this.quantity = Number(quantity)
        console.log(quantity)

    }
    setPrice(price) {
        this.price = price
        console.log(price)

    }
    setDescription(description) {
        this.description = description
        console.log(description)

    }
    setName(name) {
        this.name = name
        console.log(name)

    }

    getSaveData() {
        let data = {
            productId: this.productId,
            quantity: this.quantity,
            price: this.price,
            name: this.name,
            description: this.description
        }
        console.log(data, "here the data <>>>>")
        return data
    }

    /*     async calculateTotalPrice() {
            let product = new Product()
            product.setId(this.productId)
            await product.setupFromDatabase() // TODO fix later 
    
            const productPrice = product.getPrice() // TODO fix this function
            this.totalPrice = this.quantity * productPrice
        }
*/
}



module.exports = LineItem;