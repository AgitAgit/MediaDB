import { findOne, find, insertOne, insertMany } from './mongoActions';

function createUser(username, password){
    insertOne('users',{
        username,
            password,
            liked_books: [],
            liked_songs: []
    });
}

function validateUser(username, password){}

function addLiked(collection, id){}

function removeLiked(collection, id){}

module.exports = {createUser, validateUser, addLiked, removeLiked};