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

function addLiked(userId, mediaType='songs', elementId){//missing handling for already existing value
    pushToArray('users', userId, `liked_${mediaType}`,elementId);
}

function removeLiked(userId, mediaType='songs', elementId){
    pullFromArray('users', userId, `liked_${mediaType}`,elementId);
}
function appRemoveLiked(req, res){
    const data = req.body;
    const userId = data.userId;
    const mediaType = data.mediaType;
    const elementId = data.elementId;
    removeLiked(userId,mediaType,elementId)
    .then(() => res(`item ${elementId} removed from ${mediaType} of user: ${userId}`))
    .catch(error => res.json(error));
}

async function getLiked(userId, mediaType){
    const doc = await findOne('users',{
        "_id":{ $oid:userId }
    });
    return doc[`liked_${mediaType}`];
}

function appGetLiked(req,res){
    const data = req.body;
    const userId = data.userId;
    const mediaType = data.mediaType;
    getLiked(userId, mediaType)
    .then(result => res.json(result));
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

module.exports = {createUser, validateUser, addLiked, removeLiked, getLiked, appGetLiked, testValidateUser};

