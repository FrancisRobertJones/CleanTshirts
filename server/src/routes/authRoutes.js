const express = require('express')
const AuthController = require('../controllers/authControllers')

const router = express.Router()

const authController = new AuthController()

router.post("/create", authController.createUser)

module.exports = router