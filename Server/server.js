const express = require('express');
const axios = require('axios');
const app = express();
const spHandle = require('./spotifyHandler');
// const bkHandle = require('./booksHandler');
const { insertDB, findDB} = require('./cloudConn')
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

const data = spHandle.searchData();
data.then(data=>console.log(data));
// const spotify_client_credentials = JSON.parse(process.env.spotify_client_credentials);
// const data = axios.post('https://accounts.spotify.com/api/token', spotify_client_credentials,
// {
//     headers:{
//         "Content-Type" : "application/x-www-form-urlencoded"
//     }
// });

// data.then(response =>{
//     console.log(response.data.access_token);
// })
app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data',(req, res)=>{
    findDB()
    .then(data => {
        console.log('data:',data);
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    });
});


app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

