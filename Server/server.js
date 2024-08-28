const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');

// const songSchema = new mongoose.Schema({
//     data: 'mixed'
// });
// const song = mongoose.model('song', songSchema);

// song.find()
// .then(songs => {
//     console.log('All songs:', songs);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });
// connectDB();


// const data = spHandle.searchData();
// console.log(data);
//data.then(() => console.log(data));

const data = bkHandle.searchData();
data.then(()=> console.log(data));