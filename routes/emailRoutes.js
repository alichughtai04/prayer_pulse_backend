// src/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/emailController');

router.post('/email', subscribe);

module.exports = router;
