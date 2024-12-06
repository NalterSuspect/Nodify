var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile.controller')

router.get('/posts',profileController.posts);

router.get('/you',profileController.you);

router.get('/collection',profileController.developMode);

router.get('/jam',profileController.developMode);

module.exports = router;
