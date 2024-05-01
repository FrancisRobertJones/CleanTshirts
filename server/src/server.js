console.log("hello world")
const express = require('express')
const DatabaseConnection = require('./repositories/dataBaseConnection')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/productRoutes')
const authRouter = require('./routes/authRoutes')
const orderRouter = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const cors = require('cors')
const session = require('express-session');
require('dotenv').config();



let app = express()

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,             
    saveUninitialized: false,   
    cookie: {        
        httpOnly: true,        
        sameSite: 'lax',    
        maxAge: 24 * 60 * 60 * 1000 
    }
}))


//TODO fix proxy
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
    optionsSuccessStatus: 200 
};

const connectMongodb = DatabaseConnection.getInstance()

const PORT = 3000
connectMongodb.setUrl("mongodb://localhost:27017")

app.use(express.json())
app.use(cors(corsOptions));

app.use("/products", productsRouter)
app.use("/order", orderRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRoutes)


app.listen(PORT, () => {
    console.log(`app is up and running on port ${PORT}`)
})

