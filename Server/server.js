const express = require('express');
const axios = require('axios');
const app = express();
//const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();


app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})


app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

bkHandle.activate();