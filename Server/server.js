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

app.post('/api/data/users/create', userController.appCreateUser);
app.post('/api/data/users/validate', userController.appValidateUser);
app.post('/api/data/users/liked/add', userController.appAddLiked);
app.post('/api/data/users/liked/remove', userController.appRemoveLiked);
app.post('/api/data/users/liked/getliked', userController.appGetLiked);

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

// mongoActions.findOne('users',{"username":"Amit"});
// mongoActions.findOne('users',{"_id":{'$oid':'66ed44e26f9b16b8422aaf27'}});
//66d80dc63f0a87f0045df1a7
// userController.addLiked('66ed44e26f9b16b8422aaf27','books','66d80dc63f0a87f0045df1a0');
// userController.addLiked('66ed44e26f9b16b8422aaf27','books','66d80dc63f0a87f0045df1a7');
// userController.testValidateUser();
// userController.getLiked('66ed44e26f9b16b8422aaf27','books')
// .then(result => console.log(result));

// userController.getLiked('66ed44e26f9b16b8422aaf27','songs')
// .then(result => console.log(result));