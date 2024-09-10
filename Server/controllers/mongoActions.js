require('dotenv').config();
const axios = require('axios');
const mongoApi = process.env.MONGO_KEY;
const base_url = 'https://data.mongodb-api.com/app/data-jxtnbij/endpoint/data/v1';

function findOne(collection, filter) {
let url = `${base_url}/action/findOne`;
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection,
        filter
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

function find(collection, filter) {
    let url = `${base_url}/action/find`;
        const requestBody = {
            dataSource: 'MediaDB',
            database: 'media',
            collection,
            filter,
            limit: 40
        };
        
        return axios.post(url, requestBody, {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'apiKey': mongoApi
            }}
        )
        .then(response => response.data.documents)
        .catch(error => {
            console.error('Error:', error);
        });
    }

function insertOne(collection, document) {
    const url = `${base_url}/action/insertOne`;
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection: collection,
        document: document
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

function insertMany(collection, documents) {
    const url = `${base_url}/action/insertMany`;
    const requestBody = {
        dataSource: 'MediaDB',
        database: 'media',
        collection: collection,
        documents: documents
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

module.exports = { findOne, find, insertOne, insertMany };