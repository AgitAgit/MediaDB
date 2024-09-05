const express = require('express');
const app = express();
//const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

const itemController = require('./controllers/itemController');
const userController = require('./controllers/userController');
app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data', itemController.getData);


app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

// bkHandle.activate();