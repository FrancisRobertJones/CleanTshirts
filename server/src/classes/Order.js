const ContainsLineItems = require("./ContainsLineItems")

class Order extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "orders"
    }

    getSaveData() {
        let data = {}
        if(this._orderDate) {
            data["orderDate"]= this._orderDate
        }
        if(this._customer) {
            data["customer"]= this._customer
        }
        if(this._status) {
            data["status"]= this._status
        }
        //TODO COMPLETE
    }


    /*     _id
    662126e8b0e613b243b8119f
    orderDate
    2014-04-17T00:00:00.000+00:00
    customer
    "francis@example.com"
    totalPrice
    500
    paymentId
    null
    status
    "unpaid"
    
     */
}

module.exports = Order