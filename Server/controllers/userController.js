const { findOne, find, insertOne, insertMany, pushToArray, pullFromArray } = require ('./mongoActions.js');

function createUser(username, password){
    insertOne('users',{
        username,
            password,
            liked_books: [],
            liked_songs: []
    });
}

async function validateUser(username, password){
    const user = await findOne('users',{ 
        $and:[
        {'username':username},
        {'password':password}
    ]});
    // console.log(user);
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
//Tests:
async function testValidateUser(){
    const test1= await validateUser('Amit','1234');
    const test2= await validateUser('Yaniv','1234');
    const test3= await validateUser('Amit','1111');
    const test4= await validateUser('amit','1234');
    
    console.log('should pass:',test1);
    console.log('should not pass:',test2);
    console.log('should not pass:',test3);
    console.log('should not pass:',test4);
}

module.exports = {createUser, validateUser, addLiked, removeLiked, testValidateUser};

