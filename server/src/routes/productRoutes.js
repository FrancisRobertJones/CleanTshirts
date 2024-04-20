const express = require('express')
const ProductController = require('../controllers/productControllers');

const router = express.Router()

const productController = new ProductController();

router.get("/", productController.getProducts)
router.get("/:id", productController.getProduct)
router.post("/create-product", productController.createProduct)
router.post("/edit-product", productController.editProduct)
router.post("/delete-product", productController.deleteProduct)

module.exports = router