const Product = require("../classes/Product")

class ProductController {
    constructor() {
    }

    getProducts = async (req, res) => {
        try {
            const product = new Product()
            const products = await product.getAll()
            res.status(200).json({ products });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getActiveProducts = async (req,res) => {
        try {
            const product = new Product()
            const products = await product.getAllActive()
            res.status(200).json({ products });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    createProduct = async (req, res) => {
        const product = new Product()
        const productData = req.body
        try {
            product.setName(productData.name)
            product.setPrice(productData.price)
            product.setImage1(productData.image1)
            product.setImage2(productData.image2)
            product.setAmountInStock(productData.amountInStock)
            product.setDescription(productData.description)
            product.setCategory(productData.category)
            product.setStatus(productData.status)


            const insertResult = await product.save()
            res.status(200).json({ insertResult })
        } catch (error) {
            res.status(500).json({ "error": error })
        }
    }

    editProduct = async (req, res) => {
        const product = new Product()
        const productId = req.params.id
        const productData = req.body
        try {
            product.setObjectId(productId);
            product.setName(productData.name)
            product.setPrice(productData.price)
            product.setImage1(productData.image1)
            product.setImage2(productData.image2)
            product.setAmountInStock(productData.amountInStock)
            product.setDescription(productData.description)
            product.setCategory(productData.category)
            product.setStatus(productData.status)

            const updateResult = await product.save()
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
    }

    deleteProduct = async (req, res) => {
        const { productId } = req.body
        const product = new Product()
        console.log(productId)
        try {
            product.setId(productId)
            const deletionRes = await product.delete()
            if (deletionRes.acknowledged && deletionRes.deletedCount > 0) {
                res.status(200).json({ message: "Product deleted successfully", details: deletionRes });
            } else if (deletionRes.acknowledged && deletionRes.deletedCount === 0) {
                res.status(404).json({ message: "No product found with the provided ID" });
            } else {
                res.status(500).json({ message: "Failed to delete product", details: deletionRes });
            }
        } catch (error) {
            console.log("issue deleting product", error)
        }
    }
}

module.exports = ProductController
