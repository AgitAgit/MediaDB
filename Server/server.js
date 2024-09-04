const express = require('express');
const axios = require('axios');
const app = express();
const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

const itemController = require('./controllers/itemController');
const userController = require('./controllers/userController');
const mongoActions = require('./controllers/mongoActions');

app.use(cors());

app.get('/api/ping', (req,res) =>{
    res.json({message:"Pong!"});
})

app.get('/api/data', itemController.getData);

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
});

const names = ["Johnny+Cash","Tool","Pantera","Avenged+sevenfold","Meir+Ariel",
  "The+Beatles",
  "Queen",
  "Michael+Jackson",
  "David+Bowie",
  "Led+Zeppelin",
  "Pink+Floyd",
  "The+Rolling+Stones",
  "Madonna",
  "Elton+John",
  "Beyoncé",
  "ABBA",
  "The+Who",
  "U2",
  "Bruce+Springsteen",
  "AC/DC",
  "Whitney+Houston",
  "The+Eagles",
  "Bob+Dylan",
  "The+Doors",
  "The+Cure",
  "Guns+N'+Roses",
  "The+Police",
  "Nirvana",
  "Metallica",
  "Red+Hot+Chili+Peppers",
  "Green+Day",
  "The+Jimi+Hendrix+Experience",
  "The+Beach+Boys",
  "Aerosmith",
  "The+Kinks",
  "The+Velvet+Underground",
  "The+Ramones",
  "The+Talking+Heads",
  "Depeche+Mode",
  "The+Sex+Pistols",
  "The+Clash",
  "Joy+Division",
  "New+Order",
  "The+Smiths",
  "The+Cure",
  "Radiohead",
  "The+Smashing+Pumpkins",
  "Oasis",
  "Coldplay",
  "Arctic+Monkeys",
  "The+Black+Keys",
  "Imagine+Dragons",
  "The+Weeknd",
  "Doja+Cat"];

function recNames(index){
    if(index >= names.length - 1) return;
    
    spHandle.searchData("track", names[index]).then(result => {
        result.forEach(track => {
            const refined = spHandle.refineTrackData(track);
            mongoActions.insertOne("songs",refined);
        });
    }).then(recNames(index+1))
}

//bkHandle.activate();