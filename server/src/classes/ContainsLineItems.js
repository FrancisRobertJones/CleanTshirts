const LineItem = require("./LineItem")
const DatabaseObject = require("./DatabaseObject")


class ContainLineItems extends DatabaseObject {
    constructor(id) {
        super(id);

        this._lineItems = []
    }

    loadFromDatabase() {
        let lineItemsData = super.loadFromDatabase()["lineItems"]

        for (let lineItemData in lineItemsData) {
            this._lineItems.push(new LineItem());
        }
    }

    getLineItems() {
        return this._lineItems
    }

    //add an existing
    addLineItem(aLineItem) {
        this._lineItems.push(aLineItem)
    }

    //create a new lineitem
    async createLineItem(productId, amount) {
        await this.ensureHasId()

        let lineItem = new LineItem()

        lineItem.setOrder(this.id)
        lineItem.setProduct(productId)
        lineItem.setAmount(amount)
        await lineItem.calculateTotalPrice()

        await lineItem.save()

        this.addLineItem(lineItem)
    }

    async calculateTotalPrice() {
        let total = this._lineItems.reduce((total, lineItem, index) => {
            return total + lineItem.totalPrice
        }, 0)

        this.totalPrice = total
    }

    removeLineItem() {
        //TODO
    }
}

module.exports = ContainLineItems;