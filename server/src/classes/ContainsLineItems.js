const LineItem = require("./LineItem")
const DatabaseObject = require("./DatabaseObject")


class ContainLineItems extends DatabaseObject {
    constructor(id) {
        super(id);

        this._lineItems = []
    }

    loadFromDatabase() {
        let lineItemsData = super.loadFromDatabase()["lineItems"]

        for(let lineItemData in lineItemsData) {
            this.lineItems.push(new LineItem());
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
        let lineItem = new LineItem
        lineItem.setProduct(productId)
        lineItem.setAmount(amount)
        await lineItem.save()

        this.addLineItem(linteItem)
    }

    removeLineItem() {
//TODO
    }
}

module.exports = ContainLineItems;