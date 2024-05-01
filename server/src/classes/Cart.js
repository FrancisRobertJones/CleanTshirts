const ContainsLineItems = require("./ContainsLineItems")
const Order = require("./Order")
const LineItem = require("./LineItem")

class Cart extends ContainsLineItems {
    constructor() {
        super()
        this.collection = "cart"
        this._id = null
        this._lineItems = []
    }

    setUserId(userId) {
        this.userId = userId
    }

    async loadCartForUser() {
        try {
            let cart = await this.loadFromDatabase(this.userId)
            this.id = cart._id
            this._lineItems = cart.lineItems
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
            await this.save()
        } catch (error) {
            console.log(error, "error updating cart items")
        }
    }

    getSaveData() {
        let data = {
            userId: this.userId,
            lineItems: Array.isArray(this._lineItems) ? this._lineItems.map(lineItem => lineItem.getSaveData()) : [],
        };
        return data;
    }

}

module.exports = Cart