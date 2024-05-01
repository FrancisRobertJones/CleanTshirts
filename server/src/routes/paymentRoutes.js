const express = require('express');
const PaymentController = require('../controllers/paymentControllers');

const router = express.Router()

const paymentController = new PaymentController();

router.post("/create-session", paymentController.createSession)


module.exports = router