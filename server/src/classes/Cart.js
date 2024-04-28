const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")

class Cart extends ContainsLineItems {
    constructor(userId) {
        super()
        this.userId = userId
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


    //TODO figure out how to pass id from Cart class => contains line items => databaseobject to then call method on databaseconnection
    async loadCartForUser() {
        const result = await this.loadFromDatabase(this.collection, this.userId)
        if (result) {
            this._lineItems = result.lineItems || [];
            console.log("Cart loaded:", result);
        } else {
            console.log("No cart found for user:", this.userId);
        }
        return result;
    } catch(error) {
        console.log("this is the error from fetching cart", error)
    }


    getSaveData() {
        let data = {}

        if (this._totalPrice) {
            data["totalPrice"] = this._totalPrice
        }
    }
}

module.exports = Cart