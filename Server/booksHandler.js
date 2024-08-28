
const axios = require('axios');

// search query
const query = 'JavaScript';
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const { googleBooksApi } = require('./config/apiKeys');

function searchData() {
    return axios.get(baseUrl + `?q=${query}&${googleBooksApi}`)
        .then(response => {
            return response.data.items[0];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

module.exports = { searchData };