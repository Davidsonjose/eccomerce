const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authController');
const { getAllUser} = require('../controllers/userController');
// const { getUserProfile } = require('../controllers/userController');


const router = express.Router();


router.post('/register', register)
router.post('/login', login);
router.get('/getUser', getAllUser);
router.put('/forgotPassword', forgotPassword);
// router.get('/allUser', getUserProfile)
// router.get('/allUser', getAllUser)





module.exports= router;



