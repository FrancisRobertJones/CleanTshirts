    const LineItem = require("./LineItem")
    const DatabaseObject = require("./DatabaseObject")


    class ContainLineItems extends DatabaseObject {
        constructor() {
            super();
            this._lineItems = []
        }

        loadFromDatabase() {
            const lineItemsData = super.loadFromDatabase()
            return lineItemsData
        }

        getLineItems() {
            return this._lineItems
        }

        addLineItem(aLineItem) {
            this._lineItems.push(aLineItem)
        }

        async createLineItem(productId, quantity) {
            await this.ensureHasId()

            let lineItem = new LineItem()

            lineItem.setOrder(this.id)
            lineItem.setProduct(productId)
            lineItem.setQuantity(quantity)

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