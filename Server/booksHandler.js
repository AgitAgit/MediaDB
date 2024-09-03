
require('dotenv').config();
const axios = require('axios');
const booksApi = process.env.BOOKS_KEY;
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_CON_STRING;
// search query
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const query = 'harry+potter';


const HarryPotterUrl = baseUrl + `?q=${'harry+potter'}&maxResults=${'5'}&key=${booksApi}`;
const williamShakespearURL = baseUrl + `?q=${'inauthor:william+shakespeare'}&maxResults=${'5'}&key=${booksApi}`;
const franchUrl = baseUrl + `?q=""&langRestrict=${'fr'}&maxResults=${'5'}&key=${booksApi}`;

function searchData() {
    return axios.get(franchUrl)
        .then(response => response.data.items)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function connectDB() {
    mongoose.connect(mongoString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}


module.exports = { searchData, connectDB };
