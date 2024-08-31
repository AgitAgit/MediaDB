const express = require('express');
const app = express();
// const spHandle = require('./spotifyHandler');
// const bkHandle = require('./booksHandler');
const { insertDB, findDB} = require('./cloudConn')
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(cors());

app.get('/api/data',(req, res)=>{
    res.json({message:"hello from the server"});
});

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});
//findDB();

