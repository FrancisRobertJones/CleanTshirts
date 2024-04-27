const DatabaseObject = require('./DatabaseObject')
const Product = require('./Product')
const mongodb = require('mongodb')


class LineItem extends DatabaseObject {
    constructor() {
        super()
        this.collection = "lineItems"
    }

    setOrder(id) {
        this.orderId = this.getObjectId(id)
    }

    setProduct(id) {
        this.productId = this.getObjectId(id)
    }

    setAmount(amount) {
        this.amount = amount
    }

    async calculateTotalPrice() {
        let product = new Product()
        product.setId(this.productId)
        await product.setupFromDatabase() // TODO fix later 

        const productPrice = product.getPrice() // TODO fix this function
        this.totalPrice = this.amount * productPrice
    }

    getSaveData() {
        let data = {}
        if (this.orderId) {
            data["order"] = this.orderId
        }
        if (this.productId) {
            data["product"] = this.productId
        }
        if (this.amount) {
            data["amount"] = this.amount
        }
        return data
    }
/*  */
}



module.exports = LineItem;