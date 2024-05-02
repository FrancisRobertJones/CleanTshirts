const ContainsLineItems = require("./ContainsLineItems")
const LineItem = require("./LineItem")

class Order extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "orders"
        this.status = 'unpaid'
    }
    addLineItemsFromCart(cartLineItems) {
        this._lineItems = cartLineItems.map(item => {
            const orderLineItem = new LineItem();
            orderLineItem.setProductId(item.productId);
            orderLineItem.setQuantity(item.quantity);
            orderLineItem.setPrice(item.price);
            orderLineItem.setDescription(item.description);
            orderLineItem.setName(item.name);
            return orderLineItem;
        });
    }

    setUserId(userId) {
        this.userId = userId
    }

    setSessionId(sessionId){
        this.sessionId = sessionId
    }

    setOrderDate() {
        this.orderDate = new Date()
    }

    async saveOrder() {
        await this.save();
    }

    async updateOne(idData, data){
        await this.updateOneFromDB(idData, data)
    }

}


module.exports = Order