const express = require('express');
const axios = require('axios');
const app = express();
const spotifyHandler = require('./spotifyHandler');
const bkHandle = require('./booksHandler');
const cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();

const itemController = require('./controllers/itemController');
const userController = require('./controllers/userController');
const mongoActions = require('./controllers/mongoActions');

app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data', itemController.getData);

// app.listen(port,()=>{
//     console.log(`the server is listening on port ${port}`);
// });

//bkHandle.activate();
spotifyHandler.populateDB(0,10);