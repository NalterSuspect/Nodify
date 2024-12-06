const sqlite3 = require('sqlite3').verbose()
const fs = require('fs');
const db = new sqlite3.Database('./src/services/data.db') 

function createUser(username,password){
    const query = `INSERT INTO user (username,password,lastUpdate) VALUES (?,?,?)`
    db.run(query,[username,password,null]);
    db.close();
}

async function getUser(identification){
    if(typeof identification === 'string'){
        const query = `SELECT id,username,password,lastUpdate FROM user WHERE username= ?`
        const userObj = await db_get(query,[identification]);
        return userObj;
    }else{
        const query = `SELECT id,username,password,lastUpdate FROM user WHERE id= ?`
        const userObj = await db_get(query,[identification]);
        return userObj;
    }
}

async function getArtist(identification){
    const query = `SELECT idArtist,name,image FROM artist WHERE idArtist= ?`
    const userObj = await db_get(query,[identification]);
    return userObj;
}

async function getAlbum(identification){
    const query = `SELECT idAlbum,name,image FROM album WHERE idAlbum= ?`
    const userObj = await db_get(query,[identification]);
    return userObj;
}

async function getTrack(identification){
    const query = `SELECT idTrack,name,durationMs,image,idArtist,idAlbum FROM track WHERE idTrack= ?`
    const userObj = await db_get(query,[identification]);
    return userObj;
}

function insertStream(ObjStream){
    const query = `INSERT INTO stream (idUser,idTrack,date) VALUES (?,?,?)`;
    const params = [ObjStream.idUser,ObjStream.idTrack,ObjStream.date]

    db.run(query,params,
        (err) => {
            if (err) {
                console.error("id already exist:", err.message);
            }
        }
    )
}

async function insertTrack(objTrack){
    const query = `INSERT INTO track (idTrack,name,durationMs,image,idArtist,idAlbum) VALUES (?,?,?,?,?,?)`;
    const params = [objTrack.idTrack,objTrack.name,objTrack.durationMs,objTrack.image,objTrack.idArtist,objTrack.idAlbum]

    db.run(query,params,
        (err) => {
            if (err) {
                console.error("id already exist:", err.message);
            }
        }
    )
}

async function insertArtist(objArtist){
    const query = `INSERT INTO artist (idArtist,name,image) VALUES (?,?,?)`;
    const params = [objArtist.idArtist,objArtist.name,objArtist.image]

    db.run(query,params,
        (err) => {
            if (err) {
                console.error("id already exist:", err.message);
            }
        }
    )
}

async function insertAlbum(objAlbum){
    const query = `INSERT INTO album (idAlbum,name,image) VALUES (?,?,?)`;
    const params = [objAlbum.idAlbum,objAlbum.name,objAlbum.image]

    db.run(query,params,
        (err) => {
            if (err) {
                console.error("id already exist:", err.message);
            }
        }
    )
}

async function getTopTracks(limit){
    const query = `
    SELECT artist.name as artistName, h.name as trackName, h.image as trackImage,h.durationMs,h.played
    FROM artist
    JOIN(
    SELECT track.idArtist,track.name,track.image,track.durationMs,g.played
    FROM track
    JOIN(
    SELECT stream.idTrack,count(*) as played
    FROM stream
    GROUP BY stream.idTrack
    ORDER BY played DESC)g 
    ON track.idTrack = g.idTrack
    LIMIT ${limit})h
    ON artist.idArtist = h.idArtist;
    `;
    const data = await db_all(query);
    return data;
}

async function getTopArtist(limit){
    const query = `
    SELECT artist.name,artist.image,g.played
    FROM artist
    JOIN(
    SELECT track.idArtist, count(*) as played
    FROM stream
    JOIN track ON stream.idTrack = track.idTrack
    GROUP BY track.idArtist
    ORDER BY played DESC)g
    ON artist.idArtist = g.idArtist
    LIMIT ${limit};
    `;
    const data = await db_all(query);
    return data;
}

async function getTopAlbum(limit){
    const query = `
    SELECT album.name, album.image, g.played
    FROM album
    JOIN(
    SELECT track.idAlbum, count(*) as played
    FROM stream
    JOIN track ON stream.idTrack = track.idTrack
    GROUP BY track.idAlbum
    ORDER BY played DESC)g
    ON album.idAlbum = g.idAlbum
    LIMIT ${limit}
    `;
    const data = await db_all(query);
    return data;
}

async function getTotalStreams() {
    const query = `
    SELECT count(*) AS streams
    FROM stream
    `;
    const data = await db_all(query);
    return data;
}

async function setDateUpdateToUser(idUser) {
    const date = new Date();
    const dateUpdate = date.toISOString();
    
    const query = `
    UPDATE user
    SET lastUpdate = ?
    WHERE id = ${idUser};
    `;

    const params = [dateUpdate]
    db.run(query,params);
}

async function db_all(query) {
    return new Promise(
        function(resolve,reject){
            db.all(query, 
                function(err,rows){
                    if(err){return reject(err);}
                    resolve(rows);
                });
    });
}

async function db_get(query,params) {
    return new Promise(
        function(resolve,reject){
            db.get(query, params, function(err,rows){
                    if(err){return reject(err);}
                    resolve(rows);
                });
    });
}

async function closeDataBase(){
    db.close();
}

//deprecated XDD
async function isTrackExist(idTrack){
    const query = `SELECT idTrack FROM track WHERE idTrack= ?`;
    const exist = await db_get(query,[idTrack]);
    return exist!=null;
}

module.exports = {
    getTopTracks,
    getTopArtist,
    getTopAlbum,
    createUser,
    getUser,
    getArtist,
    getAlbum,
    getTrack,
    insertStream,
    insertTrack,
    insertArtist,
    insertAlbum,
    closeDataBase,
    getTotalStreams,
    setDateUpdateToUser
}