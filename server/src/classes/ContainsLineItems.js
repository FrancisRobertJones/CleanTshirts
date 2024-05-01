const LineItem = require("./LineItem")
const DatabaseObject = require("./DatabaseObject")


class ContainLineItems extends DatabaseObject {
    constructor() {
        super();
        this.lineItems = []
    }

    getSaveData() {
        return {
            userId: this.userId,
            lineItems: this.lineItems.map(item => item.getSaveData()),
            totalPrice: this.totalPrice,
            orderDate: this.orderDate
        };
    }

    async calculateTotalPrice() {
        this.totalPrice = this.lineItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

}

module.exports = ContainLineItems;