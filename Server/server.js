const express = require('express');
const axios = require('axios');
const app = express();
const {findOne} = require('./controllers/mongoActions');
const spotifyHandler = require('./spotifyAPI');
const bkHandle = require('./googleBooksAPI');
const cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();

const bookHandler = require('./controllers/bookHandler');
const songHandler = require('./controllers/songHandler');

const userController = require('./controllers/userController');
const mongoActions = require('./controllers/mongoActions');

app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data/book/get', bookHandler.getData);
app.get('/api/data/song/get' )
app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

//bkHandle.activate();
//spotifyHandler.populateDB(0,50,songsFull);
