const express = require('express');
const axios = require('axios');
const app = express();
const {findOne} = require('./controllers/mongoActions');
const spotifyHandler = require('./api/spotifyAPI');
const bkHandle = require('./api/googleBooksAPI');
const cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();

const bookHandler = require('./controllers/bookHandler');
const songHandler = require('./controllers/songHandler');

const userController = require('./controllers/userController');
const mongoActions = require('./controllers/mongoActions');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.put('/api/data/book/get', bookHandler.getData);

app.post('/api/data/song/get', songHandler.getSongs);

// app.listen(port,()=>{
//     console.log(`the server is listening on port ${port}`);
// });

// const ObjectId = require('mongodb').ObjectId;
// let ddd = ObjectId.createFromHexString('66ed44e26f9b16b8422aaf27');
//ddd = JSON.stringify(ddd);
// mongoActions.findOne('users',{"_id":new ObjectId("66ed44e26f9b16b8422aaf27")});
// mongoActions.findOne('users',{"_id":new ObjectId("66ed44e26f9b16b8422aaf27")});
// console.log(ddd);
//{"_id":ObjectId("66ed44e26f9b16b8422aaf27")}
// mongoActions.addToUser("66ed44e26f9b16b8422aaf27",'66d80dc63f0a87f0045df19d','liked_books');
// mongoActions.findOneId();