const express = require('express');
const app = express();
// const spHandle = require('./spotifyHandler');
// const bkHandle = require('./booksHandler');
const { insertDB, findDB} = require('./cloudConn')
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data',(req, res)=>{
    const data = findDB();
    data
    .then(data => {
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

