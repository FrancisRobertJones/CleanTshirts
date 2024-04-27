const DatabaseObject = require('./DatabaseObject')
const ProductRepository = require('../repositories/productRepository')


class LineItems extends DatabaseObject {
    constructor() {
        super();
        this.collection = "lineItems"
    }

    getAmount() {
        return this.getData()["amount"];
    }

    getEditData(inputData) {
        return {
            quantity: inputData.quantity,            
        }
    }

    getCreateData(inputData) {
        return {
            productId: inputData.productId,
            orderId: inputData.orderId,
            quantity: inputData.quantity,
            totalPrice: inputData.totalPrice,
        }
    }

    calculateTotalPrice() {
        
    }

 

    //create line items

    //delete line items

    //edit line items

}




module.exports = LineItems;