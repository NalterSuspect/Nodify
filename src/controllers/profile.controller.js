const db = require('../services/db.service');
const spotify = require('../middlewares/spotify.middlewares');

function MsToReadableTime(ms){
  const totalSeconds= Math.floor(ms/1000);
  const minutes =Math.floor(totalSeconds/60);
  const seconds = totalSeconds%60;
  return minutes+":"+seconds.toString().padStart(2, '0');
}

async function posts(req, res, next) {
  if(req.session.idUser==null){
    res.redirect('/user/login');
  }else{
    res.render('user/posts', {currentPath: req.path});
  }
}

async function you(req, res, next) {
  if(req.session.idUser==null){
    res.redirect('/user/login');
  }else{
    const topTracks = await db.getTopTracks(10)
  const topArtist = await db.getTopArtist(5);
  const topAlbums = await db.getTopAlbum(5);
  const totalStreams = await db.getTotalStreams();
  const userProfile = await spotify.getUserProfile(req.cookies.mytoken);

  //table to display favorite tags
  const tags =["Trance", "Progressive Rock", "Alternative", "Indie"];
  
  //use to display calendary, each color is the activity of the plays
  const week =[{day:"Mo",color:"#00FFC3"},{day:"Tu",color:"#08F1BA"},{day:"We",color:"#0FE5B3"},{day:"Th",color:"#1DCEA5"},{day:"Fr",color:"#2BB897"},{day:"Sa",color:"#38A289"},{day:"Su",color:"#478A7A"}]
  res.render('user/you', {currentPath: req.path,
    music_tags:tags,
    my_week_colors:week,
    topTracksList: topTracks,
    topArtistList: topArtist,
    topAlbumsList:topAlbums,
    totalStreams: totalStreams,
    userProfile: userProfile,
    objUser:userProfile,
    MsToReadableTime
  });
  }
}

async function developMode(req, res, next) {
  res.render('user/posts', {currentPath: req.path});
}

module.exports = {
  posts,
  you,
  developMode
};
