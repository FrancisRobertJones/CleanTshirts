const ProductRepository = require('../repositories/productRepository')


//note to self. buisiness logic, data validation, processes data. Calls a repository. NOT specifically useful in this case, but good to practise three tier architecture.
//seperation of concerns. Better testibility and modularity. 


class ProductService {
    constructor() {
        this.productRepository = new ProductRepository()
    }
    async getProducts() {
        const products = await this.productRepository.findAll()
        return products
    }
    getProduct(){
        this.productRepository.findById(productId)
    }
    createProduct(){
        this.productRepository.create(productData)
    }
    editProduct(){
        this.productRepository.edit(productId, productData)
    }
    deleteProduct(){
        this.productRepository.delete(productId)
    }
}

module.exports = ProductService