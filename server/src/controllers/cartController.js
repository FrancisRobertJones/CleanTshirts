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
}

module.exports = CartController