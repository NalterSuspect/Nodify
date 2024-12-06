const express = require('express');
var router = express.Router();
const { render } = require('jade');

router.get('/', async function(req, res) {
  res.render('index');
});


module.exports = router;
