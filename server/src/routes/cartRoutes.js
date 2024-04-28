const express = require('express')
const CartController = require('../controllers/cartController');

const router = express.Router()

const cartController = new CartController();

router.post('/cart', cartController.addToCart);
/* router.get('/cart', cartController.getCart);
router.delete('/cart/:itemId', cartController.removeFromCart);
router.post('/cart/checkout', cartController.checkout); */

module.exports = router