var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')

router.get('/login', userController.login);
router.post('/login', userController.loginUser);

router.get('/register', userController.register);
router.post('/register', userController.registerUser);

module.exports = router;