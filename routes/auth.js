const router = require('express').Router();
const User = require('../models/User');
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register' , async(req , res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),

    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err)
    }
    
})


//Login

router.post('/login' , async(req , res) => {
    try{

        const user = await User.findOne({username : req.body.username});
        if(user){
            const hashed = cryptoJs.AES.decrypt(user.password , process.env.PASSWORD_SECRET).toString(cryptoJs.enc.Utf8);
            if(hashed === req.body.password){
                const {password , ...othrs} = user._doc
                const accessToken = jwt.sign({
                    id : user._id,
                    isAdmin : user.isAdmin,
                } , process.env.JWT_SECRET_KEY,
                    {expiresIn : "3d"}
                )
                res.status(200).json({...othrs , accessToken});
            }else{
                res.status(401).json("Wrong credintials")
            }
        }else{
            res.status(401).json("Wrong credintials")
        }

    }catch(err)
    {res.status(500).json(err)}

})




module.exports = router