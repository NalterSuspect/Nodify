var express = require('express');
var router = express.Router();

const serviceObj = require('../services/service');

router.route('/:trackid')
.get(async (req,res)=>{
  await serviceObj.getTrackById(req.params.trackid,req.cookies.accesstoken);
  res.send('Hi from get /tracks/'+req.params.trackid);
})
.put((req,res)=>{
  res.send('Hi from put /tracks/'+req.params.trackid);
})
module.exports = router;
