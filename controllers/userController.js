const User = require('../models/User');

exports.getAllUser = async(req, res, next)=>{
    try {
        const allUser = await User.find();
        res.status(200).json({
            status: 'success',
            allUser,
        })
    } catch (error) {
        return next(new Error(error))
    }
}