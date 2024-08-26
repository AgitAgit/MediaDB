const express = require('express');
const mongoose = require('mongoose');

// Replace 'mongodb://your_mongo_host:your_mongo_port/your_database' with your actual connection string
const mongoURI = 'mongodb://localhost:27017/media';
const connectDB = require('./config/dbConn');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error   connecting to MongoDB:', err));

const songSchema = new mongoose.Schema({
    data: 'mixed'
});
const song = mongoose.model('song', songSchema);

song.find()
    .then(songs => {
        console.log('All songs:', songs);
    })
    .catch(err => {
        console.error('Error fetching songs:', err);
    });

const app = express();