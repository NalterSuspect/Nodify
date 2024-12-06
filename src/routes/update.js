var express = require('express');
var router = express.Router();

const updateController = require('../controllers/update.controller')

router.get('/',updateController.update);

module.exports = router;