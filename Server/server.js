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

async function getData(accessToken,route){
    axios.get(`https://api.spotify.com/v1${route}`,{
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(data => {
        console.log(data.data);
    })
    .catch();
}

async function searchData(accessToken){
    axios.get(`https://api.spotify.com/v1/search`,{
        params:{
            q: "album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold",
            type:"track"
        },
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(data => {
        console.log(data.data.tracks.items);
    })
    .catch();
}

// connectDB();
getToken()
.then(token => {
    //getData(token, '/artists/4Z8W4fKeB5YxbusRsdQVPb');
    searchData(token);
});