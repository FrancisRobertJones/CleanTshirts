const DatabaseObject = require('./DatabaseObject')
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

    getSaveData(){
        let data = {}
        if(this.orderId){
            data["order"] = this.orderId
        }
        if(this.productId){
            data["product"] = this.productId
        }
        if(this.amount){
            data["amount"] = this.amount
        }
    }

}



module.exports = LineItem;