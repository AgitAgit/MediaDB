
const axios = require('axios');

// search query
const query = 'JavaScript';
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const { googleBooksApi } = require('./config/apiKeys');

function searchData() {
    axios.get(baseUrl + `?q=${query}&${googleBooksApi}`)
        .then(response => {
            console.log('Books:', response.data.items[0]);
            // response.data.items.forEach(book => {
            //     console.log(book.volumeInfo.title);
            // })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

module.exports = { searchData };