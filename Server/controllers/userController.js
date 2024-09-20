import { findOne, find, insertOne, insertMany } from './mongoActions';

function createUser(username, password){}

function validateUser(username, password){}

function addLiked(collection, id){}

function removeLiked(collection, id){}

module.exports = {createUser, validateUser, addLiked, removeLiked};