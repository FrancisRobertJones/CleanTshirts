const express = require('express')
const ProductController = require('../controllers/productControllers');

const router = express.Router()

const productController = new ProductController();

router.get("/", productController.getProducts)
router.put("/update/:id", productController.editProduct)
router.post("/create", productController.createProduct)
router.post("/delete", productController.deleteProduct)

module.exports = router