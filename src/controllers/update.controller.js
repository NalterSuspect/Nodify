const db = require('../services/db.service');
const spotify = require('../middlewares/spotify.middlewares');
const factory = require('../factory/itemFactory');

async function update(req,res,next) {
    if(req.session.idUser==null){
        res.redirect('/user/login');
    }else{
        const objUser = await db.getUser(req.session.idUser);
        const token = req.cookies.mytoken;
        const limit = 50;

        if(objUser.lastUpdate==null){
            const historical = await spotify.getRecentPlayedTracks(token,limit);

            for(var i=0;i<limit;i++){
                const objTrack = factory.ofTrack(historical.items[i].track);
                const art = await spotify.getArtistById(historical.items[i].track.artists[0].id,token);
                const objArtist = factory.ofArtist(art);
                const objAlbum = factory.ofAlbum(historical.items[i].track.album);
                const objStream = factory.ofStream(objUser.id,historical.items[i].track.id,historical.items[i].played_at);
                
                db.insertTrack(objTrack);
                db.insertArtist(objArtist);
                db.insertAlbum(objAlbum);
                db.insertStream(objStream);
            }
            db.setDateUpdateToUser(req.session.idUser);

            res.redirect('/profile/posts');
        }else{
            const historical = await spotify.getRecentPlayedTracks(token,limit);

            for(var i=0;i<limit;i++){
                const streamDate = historical.items[i].played_at;

                const objTrack = factory.ofTrack(historical.items[i].track);
                const art = await spotify.getArtistById(historical.items[i].track.artists[0].id,token);
                const objArtist = factory.ofArtist(art);
                const objAlbum = factory.ofAlbum(historical.items[i].track.album);
                const objStream = factory.ofStream(objUser.id,historical.items[i].track.id,historical.items[i].played_at);

                if(objUser.lastUpdate < streamDate){
                    db.insertTrack(objTrack);
                    db.insertArtist(objArtist);
                    db.insertAlbum(objAlbum);
                    db.insertStream(objStream);
                }
            }
            db.setDateUpdateToUser(req.session.idUser);
            res.redirect('/profile/posts');
        }   
    }
}

module.exports = {
    update
}