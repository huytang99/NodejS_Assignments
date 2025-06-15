const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const { validate, schemas } = require('../utils/validation');

// Register new user
router.post('/register', validate(schemas.register), register);

// Login user
router.post('/login', validate(schemas.login), login);

module.exports = router; 