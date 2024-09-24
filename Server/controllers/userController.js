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
    return {newUserCreated:true}
}
async function appCreateUser(req, res){
    const {username, password} = req.body;
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

    if(user?.username === username) response.userExists = true;
    
    if(user?.password === password) response.passwordCorrect = true;
    
    return response;
}
function appValidateUser(req,res){
    const {username, password} = req.body;
    validateUser(username, password)
    .then(response => res.json(response))
    .catch(error => res.json(error));
}

async function addLiked(userId, mediaType, elementId){
    try {
        if(!["books","songs"].includes(mediaType)) throw new Error("Wrong mediaType");
        const liked = await getLiked(userId, mediaType);
        if(liked?.includes(elementId))
            return false;
        else {
            pushToArray('users', userId, `liked_${mediaType}`,elementId);
            return true;
        }
    }
    catch(err) {
        console.log("Server Error " + err);
    }
}
async function appAddLiked(req, res){
    const {username, mediaType, elementId} = req.body;
    console.log(req.body);
    
    const response = {};
    nameToId(username)
    .then(userId => addLiked(userId, mediaType, elementId))
    .then(isAdded => {
        if(isAdded)
            response["status"] = true;
        else
            response["status"] = false;
        return res.json(response);
    })
    .catch(err => res.status(500).json({ error: "Server Error:" + err.message }));
}

async function removeLiked(userId, mediaType='songs', elementId){
    await pullFromArray('users', userId, `liked_${mediaType}`,elementId);
    return true;
}
function appRemoveLiked(req, res){
    try {
        const {username, mediaType, elementId} = req.body;
        if(!["books","songs"].includes(mediaType)) throw new Error("Wrong mediaType");
        nameToId(username)
        .then(userId => {
            if(!userId) throw new Error("Username not exists");
            return removeLiked(userId,mediaType,elementId)
        })
        .then(result => res.json({status:result}))
        .catch(err => res.status(500).json({ error: "Server Error:" + err.message }));
    }
    catch(err) {
        console.log("Server Error: " + err);
    }
}

async function getLiked(userId, mediaType){
    const doc = await findOne('users',{
        "_id":{ $oid:userId }
    });
    
    return doc ? doc[`liked_${mediaType}`] : [];
}
function appGetLiked(req,res){
    const {username, mediaType} = req.body;
    
    nameToId(username)
    .then(userId => getLiked(userId, mediaType))
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: "Server Error:" + err.message }));
}

async function nameToId(username){
    const user = await findOne('users', {
        'username':username
    });
    return user ? user._id : null;
}

module.exports = { appCreateUser, appValidateUser, appAddLiked, appRemoveLiked, appGetLiked};

