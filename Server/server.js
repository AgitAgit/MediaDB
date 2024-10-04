const express = require('express');
const app = express();
// const spotifyHandler = require('./api/spotifyAPI');
// const bkHandle = require('./api/googleBooksAPI');
const cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();


const bookHandler = require('./controllers/bookHandler');
const songHandler = require('./controllers/songHandler');

const userController = require('./controllers/userController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.put('/api/data/book/get', bookHandler.getData);
app.post('/api/data/book/getrecommendation', bookHandler.getBookRecommendation);

app.post('/api/data/song/get', songHandler.getSongs);

app.post('/api/data/users/create', userController.appCreateUser);
app.post('/api/data/users/validate', userController.appValidateUser);
app.post('/api/data/users/liked/add', userController.appAddLiked);
app.post('/api/data/users/liked/remove', userController.appRemoveLiked);
app.post('/api/data/users/liked/getliked', userController.appGetLiked);

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});
