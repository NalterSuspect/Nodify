function ofTrack(objTrack){
    const idTrack = objTrack.id;
    const name = objTrack.name;
    const durationMs = objTrack.duration_ms;
    const image = objTrack.album.images[0].url;
    const idArtist = objTrack.artists[0].id;
    const idAlbum = objTrack.album.id;
    return {idTrack: idTrack,name: name,durationMs: durationMs,image: image,idArtist: idArtist,idAlbum: idAlbum};
}

function ofArtist(objArtist){
    const idArtist = objArtist.id;
    const name = objArtist.name;
    const image = objArtist.images[0].url;
    return {idArtist: idArtist,name: name,image: image};
}

function ofAlbum(objAlbum){
    const idAlbum = objAlbum.id;
    const name = objAlbum.name;
    const image = objAlbum.images[0].url;
    return {idAlbum: idAlbum,name: name,image: image};
}

function ofStream(idUser_holder,idTrack_holder,date_holder){
    const idUser = idUser_holder;
    const idTrack = idTrack_holder;
    const date = date_holder;
    return {idUser: idUser,idTrack: idTrack,date: date};
}

module.exports = {
    ofTrack,
    ofArtist,
    ofAlbum,
    ofStream
}