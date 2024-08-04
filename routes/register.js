const express = require('express');
const userController = require('../controllers/registerController');


const router = express.Router();

router.post('/register', userController.register)

module.exports = router;