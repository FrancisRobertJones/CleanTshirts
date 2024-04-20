console.log("hello world")
const express = require('express')
const DatabaseConnection = require('./dataBase/DatabaseConnection')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/productRoutes')

let app = express()


const connectMongodb = DatabaseConnection.getInstance()

const PORT = 3000
connectMongodb.setUrl("mongodb://localhost:27017")

app.use(express.json())


app.use("/products", productsRouter)


app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`)
})

