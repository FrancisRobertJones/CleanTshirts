const ProductService = require("../services/productService");

//note to self. takes data provided by routes, and passes to services. 

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.productService.getProducts();
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
            res.status(200).json({ "new product": newProduct })
        } catch (error) {
            res.status(500).json({"error": error })
        }
    }

    editProduct = async (req, res) => {
        const productId = req.params.id
        const productData = req.body
        this.productService.editProduct(productId, productData)
        //TODO fix rest of this
    }



    deleteProduct = async (req, res) => {
        productId = req.params.id
        this.productService.deleteProduct(productId)
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