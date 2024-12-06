const querystring = require('querystring');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('../scratch')

const clientId ="96e2c06444fe4b199f99d6bc3fc338f6";
const clientSecret="8e7f71b3192e4bc98bd62b9d94b1cceb";
const redirectUri="http://localhost:3000/callback";
const scope = 'user-read-private user-read-email user-read-recently-played user-top-read playlist-modify-public';

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function getAccessToken(code) {
  const payload ={
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }),
  };

  const mytoken = await fetch('https://accounts.spotify.com/api/token', payload).then(res=>{
    if (!res.ok) {throw new Error(`HTTP error! status: ${res.status}`);}
    return res.json()
  }).then(response => {
    return response.access_token;
  }).catch(error => {
    console.error('Error:', error);
    return "no token receive";
  });
  return mytoken;
}

async function redirectToSpotifyAuth(){
  var state = generateCodeVerifier(16);
  return 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    });
}

module.exports = {
  getAccessToken,
  redirectToSpotifyAuth
};