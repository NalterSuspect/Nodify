var express = require('express');
var router = express.Router();

const serviceObj = require('../services/service');

router.route('/')
.get(async (req,res)=>{
 var code = req.query.code;
 var state = req.query.state;

 if (!code || !state) {
  var spotifyAuthUrl = await serviceObj.redirectToSpotifyAuth();
  res.redirect(spotifyAuthUrl);
 }else if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  }else {
    const accessToken = await serviceObj.getAccessToken(code);
    res.cookie('mytoken', await accessToken,{
      maxAge: 1000*60*60*24,
      httpOnly: true,
      secure:false,
    });
    res.redirect('/profile/posts');
 } 
});
module.exports = router;
