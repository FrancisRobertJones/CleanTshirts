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

    setQuantity(quantity) {
        this.quantity = quantity
    }

    async calculateTotalPrice() {
        let product = new Product()
        product.setId(this.productId)
        await product.setupFromDatabase() // TODO fix later 

        const productPrice = product.getPrice() // TODO fix this function
        this.totalPrice = this.quantity * productPrice
    }

    getSaveData() {
        let data = {}
        if (this.orderId) {
            data["order"] = this.orderId
        }
        if (this.productId) {
            data["product"] = this.productId
        }
        if (this.quantity) {
            data["quantity"] = this.quantity
        }
        return data
    }
/*  */
}



module.exports = LineItem;