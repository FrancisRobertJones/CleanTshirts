const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")
const LineItem = require("./LineItem")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"
        this._id = null
    }

    setUserId(userId) {
        this.userId = userId
    }

    async loadCartForUser() {
        try {
            let cart = await this.loadFromDatabase(this.userId)
            this.id = cart._id
            return cart;
        } catch (error) {
            console.error("Error loading or creating cart:", error)
            throw error
        }
    }

    async updateCart(newCartItems) {
        try {
            this._lineItems = newCartItems.map((item) => {
                const lineItem = new LineItem()

                lineItem.setProductId(item.product._id)
                lineItem.setQuantity(item.quantity)
                lineItem.setPrice(item.product.price)
                lineItem.setDescription(item.product.description)
                lineItem.setName(item.product.name)
                return lineItem
            })
            console.log(this._lineItems)
            await this.save()
        } catch (error) {
            console.log(error, "error updating cart items")
        }
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
        let data = {
            userId: this.userId,
            lineItems: this._lineItems.map(lineItem => lineItem.getSaveData()),
        };

        console.log("Data to be saved for cart:", data);
        return data;
    }

}

module.exports = Cart