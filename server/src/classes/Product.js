const DatabaseObject = require('./DatabaseObject')
const ProductRepository = require('../repositories/productRepository')
const DatabaseConnection = require('../repositories/productRepository')


//note to self. buisiness logic, data validation, processes data. Calls a repository. NOT specifically useful in this case, but good to practise three tier architecture.
//seperation of concerns. Better testibility and modularity. 


//change whole thing to a product class instead of getting back JSON, we get back classes of type product. Product class comunnicates with product repostiory, for unique things, but also to a generic repository.

class Product extends DatabaseObject {
    constructor() {
        super()
        this.collection = "products"
    }

    getSaveData(){
        let data = {}
        return data
    }

}

module.exports = Product