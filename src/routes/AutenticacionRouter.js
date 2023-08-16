const express = require('express');
const router = express.Router();
const AutenticacionController = require('../controllers/AutenticacionController');

router.post('/register', AutenticacionController.register);
router.post('/login', AutenticacionController.login);

module.exports = router;