const DatabaseObject = require('./DatabaseObject')
const ProductRepository = require('../repositories/productRepository')


//note to self. buisiness logic, data validation, processes data. Calls a repository. NOT specifically useful in this case, but good to practise three tier architecture.
//seperation of concerns. Better testibility and modularity. 


//change whole thing to a product class instead of getting back JSON, we get back classes of type product. Product class comunnicates with product repostiory, for unique things, but also to a generic repository.

class Product extends DatabaseObject {
    constructor() {
        super()
        this.collection = "products"
    }


    setData(inputData) {
        this._name = inputData.name,
        this._price = inputData.price,
        this._image1 = inputData.image1,
        this._image2 = inputData.image2,
        this._amountInStock = inputData.amountInStock,
        this._description = inputData.description,
        this._category = inputData.category
    }


    getSaveData() {
        let data = {
            name: this._name,
            price: this._price,
            image1: this._image1,
            image2: this._image2,
            amountInStock: this._amountInStock,
            description: this._description,
            category: this._category,
        }
        console.log("data in product", data)
        return data
    } 
}

module.exports = Product