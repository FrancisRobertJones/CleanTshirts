const ProductService = require("../classes/Product");
const Product = require("../classes/Product")

//note to self. takes data provided by routes, and passes to services. 

class ProductController {
    constructor() {
        this.product = new Product()
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.product.getAll()
            console.log("here are the products in controllers", products)
            res.status(200).json({ products });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    createProduct = async (req, res) => {
        const productData = req.body
        try {
            const newProduct = await this.productService.createProduct(productData);
            //TODO deal with newProductID
            console.log("this is the newly created product", newProduct)
            res.status(200).json({ newProduct })
        } catch (error) {
            res.status(500).json({ "error": error })
        }
    }

    editProduct = async (req, res) => {
        const productId = req.params.id
        const productData = req.body
        try {
            const updatedProduct = await this.productService.editProduct(productId, productData)
            if (updatedProduct.acknowledged && updatedProduct.modifiedCount > 0) {
                res.status(200).json({ message: "Product updated successfully" });
            } else if (updatedProduct.matchedCount === 0) {
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
        console.log(productId)
        try {
            const deletionRes = await this.product.setObjectId(productId).delete()
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

/* app.post("/create-order", async (request, response) => {
    const orderId = await DatabaseConnection.getInstance().saveOrder(request.body.lineItems, request.body.customer)
    response.send(200).json(orderId)
})


app.post("/create-product", async (request, response) => {
    const product = request.body
    if (product) {
        response.status(200).json({"product added": product})
        console.log("product added")
        return
    }
    response.status(400).json("no product found")
    console.log(product)
}) */