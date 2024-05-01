const Order = require("../classes/Order")
const Cart = require("../classes/Cart")

class OrderController {
    constructor() {
    }

    getOrders = async (req, res) => {
        console.log("HELLO FROM GETORDERS")
        const userId = req.session.user.userId;
        try {
            const order = new Order()
            order.setUserId(userId)
            const orders = await order.getAll()
            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    createOrder = async (req, res) => {
        const userId = req.session.user.userId
        const cart = new Cart()
        cart.setUserId(userId)
        try {
            await cart.loadCartForUser()
            const order = new Order()
            order.setUserId(userId)
            order.setOrderDate()
            order.addLineItemsFromCart(cart.lineItems)
            await order.calculateTotalPrice()
            await order.saveOrder()
            return order

        } catch(error) {
            console.log(error)
        }
    }

    getAllOrders = async (req, res) => {
        const userId = req.session.user.userId;
        try {
            const order = new Order()
            const orders = await order.getAll()
            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = OrderController