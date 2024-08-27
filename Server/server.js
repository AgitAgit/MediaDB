const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
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

    await axios.post('https://accounts.spotify.com/api/token', {
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