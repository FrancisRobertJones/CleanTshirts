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

    editCart = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const userId = req.session.user.userId;
            const updatedCartItems = req.body;
            const cart = new Cart()
            cart.setUserId(userId)
            await cart.loadCartForUser()
            await cart.updateCart(updatedCartItems)
            res.status(200).json({ message: "Cart updated successfully" });
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).send(error.message);
        }
    }



    /* 
        addToCart = async (req, res) => {
            const { productId, quantity } = req.body
            const cart = new Cart()
            try {
                cart.createLineItem(productId, quantity)
    
                res.status(200).json({ message: "item added to cart" });
            } catch (error) {
                res.status(500).send(error.message);
            }
        } */

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

    /*     createLineItem = async (req, res) => {
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
        } */

}

module.exports = CartController