const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const client_credentials = require('./config/spotifyClientCred');
const port = 3500;


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

async function getToken(){
    let token = '';

    await axios.post('https://accounts.spotify.com/api/token', client_credentials,
    {
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        token = response.data.access_token;
    })
    .catch(error => {
    });

    return token;
}
async function getData(accessToken){
    axios.get('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',{
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch();
}

// connectDB();
getToken()
    .then(token => {
        getData(token)
    });