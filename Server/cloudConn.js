
require('dotenv').config();
const mongoApi = process.env.MONGO_KEY;
let url = 'https://data.mongodb-api.com/app/data-jxtnbij/endpoint/data/v1';

function findDB() {
let url = 'https://data.mongodb-api.com/app/data-jxtnbij/endpoint/data/v1/action/findOne';
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection: 'books',
        filter: {
            "title": "harry potter"
        }
    };
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apiKey': mongoApi
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function insertDB() {
    url = 'https://data.mongodb-api.com/app/data-jxtnbij/endpoint/data/v1/insertOne';
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection: 'books',
        document: {
            title: "harry potter2",
            author: ['J.K Rolling2']
        }
    };
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apiKey': mongoApi
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


module.exports = { insertDB, findDB };