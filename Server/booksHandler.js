
const axios = require('axios');

// search query
const query = 'harry+potter';
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const { googleBooksApi } = require('./config/apiKeys');

const HarryPotterUrl = baseUrl + `?q=${'harry+potter'}&maxResults=${'5'}&key=${googleBooksApi}`;
const williamShakespearURL = baseUrl + `?q=${'inauthor:william+shakespeare'}&maxResults=${'5'}&key=${googleBooksApi}`;
const franchUrl = baseUrl + `?q=""&langRestrict=${'fr'}&maxResults=${'5'}&key=${googleBooksApi}`;

function searchData() {
    return axios.get(franchUrl)
        .then(response => response.data.items)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

module.exports = { searchData };
