const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"

    }

    setUserId(userId) {
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
            let cart = await this.loadFromDatabase(this.userId)
            console.log("Cart loaded for user:", this.userId);
            return cart;
        } catch (error) {
            console.error("Error loading or creating cart:", error)
            throw error
        }
    }


    getSaveData() {
        let data = {
            userId: this.userId,
            lineItems: this._lineItems.map(lineItem => lineItem.getSaveData()),
/* TODO NOT PRIO
            totalCartValue: this.calculateTotalCartValue(),  
 */        };

        console.log("Data to be saved for cart:", data);
        return data;
    }

}

module.exports = Cart