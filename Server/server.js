const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');

const songSchema = new mongoose.Schema({
    name:'string',
    album:'string',
    artist:'string'
});

// song.find()
// .then(songs => {
//     console.log('All songs:', songs);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

const Song = mongoose.model('Song', songSchema);
connectDB();
const songs = spHandle.searchData();


function insertSong(song){
    const newSong = new Song({
        name: song.name,
        album: song.album.name,
        artist: song.artists[0].name
    });
    newSong.save();
}
songs.then(songs=> {
    songs.forEach(song =>{
        insertSong(song);
    })
});