//requirements

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');

//importing routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/products')
const stripeRouter = require('./routes/stripe')


//mongoDB connection
mongoose.connect( process.env.MONGO_URL , () => {
    console.log('mongodb connected')
}).catch(err => {
    console.log(err)
})



//middleware
app.use(express.json())
app.use(bodyParser.urlencoded());
app.use(morgan("common"));
app.use(cors())




app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/products' , productsRouter)
app.use('/api/carts' , cartRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/checkout' , stripeRouter)





app.listen(process.env.PORT || 5000 , () => {
    console.log("backend running on port : " + process.env.PORT);
})