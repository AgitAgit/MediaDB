const { findOne, find, insertOne, insertMany, pushToArray, pullFromArray } = require ('./mongoActions.js');

function createUser(username, password){
    insertOne('users',{
        username,
            password,
            liked_books: [],
            liked_songs: []
    });
}

function validateUser(username, password){
    const user = findOne('users',{ 
        $and:[
        {'username':username},
        {'password':password}
    ]});
    if(user) return true;
    else return false;
}

function addLiked(userId, mediaType='songs', elementId){
    pushToArray('users', userId, `liked_${mediaType}`,elementId);
}

function removeLiked(userId, mediaType='songs', elementId){
    pullFromArray('users', userId, `liked_${mediaType}`,elementId);
}

function getLiked(userId, mediaType){

}

module.exports = {createUser, validateUser, addLiked, removeLiked};