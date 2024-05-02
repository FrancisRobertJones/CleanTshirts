const LineItem = require("./LineItem")
const DatabaseObject = require("./DatabaseObject")


class ContainLineItems extends DatabaseObject {
    constructor() {
        super();
        this._lineItems = []
    }

    getSaveData() {
        return {
            userId: this.userId,
            lineItems: this._lineItems.map(item => item.getSaveData()),
            totalPrice: this.totalPrice,
            orderDate: this.orderDate,
            status: this.status,
            sessionId: this.sessionId
        };
    }

    async calculateTotalPrice() {
        this.totalPrice = this._lineItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

}

module.exports = ContainLineItems;