const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"
    }

    async createOrder() {
        let order = new Order

        for (let i = 0; i < this._lineItems.length; i++) {
            let lineItem = this._lineItems[i];
            await order.createLineItem(lineItem.productId, lineItem.quantity)
        }
        await order.calculateTotalPrice()
        await order.save()
        return order
    }


    getSaveData() {
        let data = {}

        if (this._totalPrice) {
            data["totalPrice"] = this._totalPrice
        }
    }
}

module.exports = Cart