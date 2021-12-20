const express = require('express');
const { register, login, getAllUser } = require('../controllers/authController');


const router = express.Router();


router.post('/register', register)
router.post('/login', login);
// router.get('/allUser', getAllUser)





module.exports= router;



