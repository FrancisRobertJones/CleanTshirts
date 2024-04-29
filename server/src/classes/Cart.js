const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"

    }

    setUserId(userId) {
        this.setId(userId)
        this.userId = userId
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

    async loadCartForUser() {
        try {
            console.log("hello from loadcartforuser>>", this.userId)

            const result = await this.loadFromDatabase(this.collection, this.userId)
            if (result) {
                this._lineItems = result.lineItems || [];
                console.log("Cart loaded:", result);
            } else {
                console.log("No cart found for user:", this.userId);
            }
            return result;
        } catch (error) {
            console.log("Error in loadCartForUser:", error)
            throw error
        }
    }

    getSaveData() {
        let data = {}

        if (this._totalPrice) {
            data["totalPrice"] = this._totalPrice
        }
    }
}

module.exports = Cart