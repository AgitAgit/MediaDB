
require('dotenv').config();
const mongoApi = process.env.MONGO_KEY;
let base_url = 'https://data.mongodb-api.com/app/data-jxtnbij/endpoint/data/v1';

function findOne() {
let url = `${base_url}/action/findOne`;
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection: 'books',
        filter: {
            "title": "harry potter"
        }
    };
    return fetch(url, {
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
        //console.log('Success:', data);
        return data.document;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function insertOne() {
    const url = `${base_url}/action/insertOne`;
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


module.exports = { insertDB: insertOne, findOne };