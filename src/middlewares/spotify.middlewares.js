async function getTrackById(trackId,accessToken){
  const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(response => {
      console.log('Track Information:', response); // Output the track information
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });
  return result;
}

async function getArtistById(artistId,accessToken){
  const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });
    return result;
}

async function getAlbumById(albumId,accessToken){
  const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(response => {
      console.log('Track Information:', response); // Output the track information
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });
    return result;
}

async function getUserProfile(token){
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
}).then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
})
.then(response => {
  return response;
})
.catch(error => {
  console.error('Error:', error);
  return "no token receive";
});
return result;
}

async function getRecentPlayedTracks(token,limit){
  const result = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit="+limit, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.error('Error:', error);
    return "no token receive";
  });
  return result
}

module.exports = {
    getAlbumById,
    getTrackById,
    getArtistById,
    getUserProfile,
    getRecentPlayedTracks
}