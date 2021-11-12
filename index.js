//requirements

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

//importing routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const stripeRouter = require('./routes/stripe');
const { verifyTokenAndAdmin } = require('./routes/verifyToken');


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
app.use("/images", express.static(path.join(__dirname, "/public/images")));



//FILE UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload",verifyTokenAndAdmin , upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});





//ROUTES
app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/products' , productsRouter)
app.use('/api/carts' , cartRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/checkout' , stripeRouter)





app.listen(process.env.PORT || 5000 , () => {
    console.log("backend running on port : " + process.env.PORT);
})