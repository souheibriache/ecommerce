const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('./verifyToken');
const Order = require('../models/Order');


//CREATE ORDER
router.post('/', verifyToken, async (req, res) => {

    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }

})

//UPDATE ORDER
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE A ORDER
router.delete('/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET A USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.userId });
        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL ORDERS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.productId
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([{
            $match: { createdAt: { $gte: previousMonth } , ...(productId && {
                products : {$elemMatch: {productId : productId}}
            })}
        },
        {
            $project:
            {
                month: { $month: '$createdAt' },
                sales :  '$amount',
            }
        },
        {
            $group:{
                _id : '$month',
                total : {$sum : '$sales'}
            }
        }
        ]);
        
        res.status(200).json(income.sort((a,b) => a._id - b._id));
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router