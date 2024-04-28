console.log("hello world")
const express = require('express')
const DatabaseConnection = require('./repositories/dataBaseConnection')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/productRoutes')
const authRouter = require('./routes/authRoutes')
const orderRouter = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const cors = require('cors')

let app = express()


const connectMongodb = DatabaseConnection.getInstance()

const PORT = 3000
connectMongodb.setUrl("mongodb://localhost:27017")

app.use(express.json())
app.use(cors())


app.use("/products", productsRouter)
app.use("/orders", orderRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRoutes)


app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`)
})

