const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('token')
        const data = jwt.verify(token, process.env.JSW_WEB_TOKEN_SECRETKEY)
        const user = await User.findByPk(data.userId)
        req.user = user
        next()
    }
    catch (err) {
         console.log(err) 
         return res.status(401).json({success:false,message:"something went wrong"});
        }
}
