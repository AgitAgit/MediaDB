const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const port = 3500;


const songSchema = new mongoose.Schema({
    data: 'mixed'
});
const song = mongoose.model('song', songSchema);

song.find()
.then(songs => {
    console.log('All songs:', songs);
})
.catch(err => {
    console.error('Error fetching songs:', err);
});

async function getToken(){
    axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: "dfa2522400934fe6b7005ca8ddc3add9",
        client_secret: "d00c517b014443bdadb77e74b626415a",
    },
    {
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
    });
}
async function getData(){
    axios.get('')
    .then()
    .catch();
}


connectDB();