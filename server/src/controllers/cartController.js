const Cart = require("../classes/Cart")

class CartController {
    constructor() {
    }

    getCart = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const userId = req.session.user.userId;
            const cart = new Cart()
            cart.setUserId(userId)

            const cartItems = await cart.loadCartForUser()
            res.status(200).json({ cartItems });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


    addToCart = async (req, res) => {
        const { productId, quantity } = req.body
        const cart = new Cart()
        try {
            cart.createLineItem(productId, quantity)

            res.status(200).json({ message: "item added to cart" });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    //remove from cart

    //edit line item

    createOrder = async (req, res) => {
        const order = new Order()
        const orderData = req.body
        try {
            order.setData(orderData)
            const insertResult = await order.save()
            console.log("this is the newly created order", insertResult)
            res.status(200).json({ insertResult })
        } catch (error) {
            res.status(500).json({ "error": error })
        }
    }

    createLineItem = async (req, res) => {
        const order = new Order()
        const orderData = req.body
        try {
            order.setData(orderData)
            const insertResult = await order.save()
            console.log("this is the newly created order", insertResult)
            res.status(200).json({ insertResult })
        } catch (error) {
            res.status(500).json({ "error": error })
        }
    }

    /*     editOrder = async (req, res) => {
            const order = new Order()
            const orderId = req.params.id
            const orderData = req.body
            try {
                product.setObjectId(orderId); 
                product.setData(orderData)
                const updateResult = await order.save()
                console.log("CONTROLLER UPDATERESULT", updateResult)
                if (updateResult.acknowledged && updateResult.modifiedCount > 0) {
                    res.status(200).json({ message: "Product updated successfully" });
                } else if (updateResult.matchedCount === 0) {
                    res.status(404).json({ message: "No product found with provided ID" });
                } else {
                    res.status(200).json({ message: "No changes made to the product" });
                }
            } catch (error) {
                res.status(500).json({ "error": error })
            }
        } */
}

module.exports = CartController