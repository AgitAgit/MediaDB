const { findOne, find, insertOne, insertMany, pushToArray, pullFromArray } = require ('./mongoActions.js');

//needs some touch ups
async function createUser(username, password){
    const check = await validateUser(username, password);
    if(check.userExists){
        check.passwordCorrect = null;
        check.newUserCreated = false;
        return check;
    }

    insertOne('users',{
        username,
        password,
        liked_books: [],
        liked_songs: []
    })
    
    // const check2 = await validateUser(username, password);
    // if(check2.userExists && check2.passwordCorrect){
    //     check2.newUserCreated = true;
    // }
    const check2 = {
        newUserCreated:true
    }
    return check2;
}
async function appCreateUser(req, res){
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const check = await createUser(username, password);
    res.json(check);
}

async function validateUser(username, password){
    let response = {
        userExists: false,
        passwordCorrect: false
    };
    const user = await findOne('users', {
        'username':username
    });
    // const correctUser = await findOne('users',{ 
    //     $and:[
    //     {'username':username},
    //     {'password':password}
    // ]});
    if(user && user.username === username && user.password === password){
        response.userExists = true;
        response.passwordCorrect = true;
    }
    else if(user && user.username === username && !(user.password === password)){
        response.userExists = true;
        response.passwordCorrect = false;
    }

    return response;
}
function appValidateUser(req,res){
    const data = req.body;
    const username = data.username;
    const password = data.password;
    validateUser(username, password)
    .then(response => res.json(response))
    .catch(error => res.json(error));
}

async function addLiked(userId, mediaType, elementId){//missing handling for already existing value
    const liked = await getLiked(userId, mediaType);
    if(liked && liked.includes(elementId)){
        return false;
    }
    else{
        pushToArray('users', userId, `liked_${mediaType}`,elementId);
        return true;
    }
}
async function appAddLiked(req, res){
    const data = req.body;
    const userId = data.userId;
    const mediaType = data.mediaType;
    const elementId = data.elementId;
    const isAdded = await addLiked(userId, mediaType, elementId)
    console.log('appAddLiked isAdded', isAdded);
    let response = 'check';
    if(isAdded){
        response = `item '${elementId}' added to liked_${mediaType} of user: '${userId}'`
    }
    else{
        response = `failed to add item '${elementId}'. It already exists in liked_${mediaType} of user: '${userId}',or some error occured`
    } 
    res.json(response);
    // .then(isAdded => {
    // })
    // .catch(error => res.json(error));
}

async function removeLiked(userId, mediaType='songs', elementId){
    await pullFromArray('users', userId, `liked_${mediaType}`,elementId);
}
function appRemoveLiked(req, res){
    const data = req.body;
    const userId = data.userId;
    const mediaType = data.mediaType;
    const elementId = data.elementId;
    removeLiked(userId,mediaType,elementId)
    .then(result => res.json(`item ${elementId} removed from liked_${mediaType} of user: ${userId}`))
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

module.exports = { appCreateUser, appValidateUser, appAddLiked, appRemoveLiked, appGetLiked, testValidateUser};

