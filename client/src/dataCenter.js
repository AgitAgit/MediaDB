import { faV } from '@fortawesome/free-solid-svg-icons';
import defaultImg from './assets/book_img_not_available.png';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const _SERVER_PORT = 8080;
const _SERVER_ADDRESS = 'https://mediadb-91464205485.us-central1.run.app';
const _LOCAL_SERVER_ADDRESS = `http://localhost:${_SERVER_PORT}`;

const _CURRENT_ADDRESS = _SERVER_ADDRESS;

function addLiked(username,mediaType, elementId) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/users/liked/add`,
        {
            username,
            mediaType,
            elementId
        }
    )
    .then(response => response.data)
    .catch(err => console.log("Client fetching error:",err)); 
}
function removeLiked(username,mediaType, elementId) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/users/liked/remove`,
        {
            username,
            mediaType,
            elementId
        }
    )
    .then(response => response.data)
    .catch(err => console.log("Client fetching error:",err)); 
}
function getUserLiked(username, mediaType) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/users/liked/getliked`,
        {
            username,
            mediaType
        }
    )
    .then(response => response.data)
    .catch(err => console.log("Client fetching error:",err)); 
}
function validateUser(username, password) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/users/validate`,
        {
            username,
            password: CryptoJS.SHA256(password).toString()
        }
    )
    .then(response => response.data)
    .catch(err => console.log("Client fetching error:",err)); 
}
function createUser(username,password) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/users/create`,
        {
            username,
            password: CryptoJS.SHA256(password).toString()
        }
    )
    .then(response => response.data)
    .catch(err => console.log("Client fetching error:",err)); 
}

function getBooks(searchText, method, limit=100, favorites, favBooks){    
    const filter = {};
    filter[method] = { $regex: searchText, $options: "i"};
    if(favorites)
        filter["_id"] = favBooks?.length > 0 ? { $in : favBooks.map(id => ({ "$oid": id }))} : [];
    return axios.put(`${_CURRENT_ADDRESS}/api/data/book/get`, {
        filter,
        limit
    })
    .then(books => {
        const data = books.data;
        if(data && data.length > 0) data.forEach(element => {
            if(element.hasOwnProperty("publishedDate") && element.publishedDate.length > 10)
                element.publishedDate = element.publishedDate.slice(0,10);
            if(!element.img) element.img = defaultImg;
    });
    return data;
    })
    .catch(err => console.log("Client fetching error:",err));
}
function getBookRecommendation(book_id, { signal }) {
    return axios.post(`${_CURRENT_ADDRESS}/api/data/book/getrecommendation`, {
        book_id
    }, { signal })
    .then(books => {
        const data = books.data;
        if(data && data.length > 0) data.forEach(element => {
            if(element.hasOwnProperty("publishedDate") && element.publishedDate.length > 10)
                element.publishedDate = element.publishedDate.slice(0,10);
            if(!element.img) element.img = defaultImg;
    });
    return data;
    })
    .catch(err => console.log("Client fetching error:",err));
}

function getSongs(filter = {}, limit = 2){
    return axios.post(`${_CURRENT_ADDRESS}/api/data/song/get`,{
        filter,
        limit
    })
    .then(songs => {
        return songs.data.map(song => {
            const process = processSong(song);
            //console.log(process);
            return process;
        });
    });
}

function searchSongs(field = 'artists.0.name',query = 'Led', limit = 10){
    const filter = {
        [field]:{ $regex: query, $options:"i"}
    }
    return getSongs(filter,limit);
}

function getSongsById(ids,limit = 1000){
    console.log("getById called with ids:", ids);
    const filter = {
        _id: {$in:ids}
    }
    return getSongs(filter,limit);
}


function processSong(song){
    const _id = song._id;
    const track = song.name;
    const album = song.album.name;
    const albumReleaseDate = song.album.release_date;
    const artist = song.artists[0].name;
    const img = song.album.images[0].url;
    const trackLink = song.external_urls.spotify;
    const albumLink = song.album.external_urls.spotify;
    const artistLink = song.artists[0].external_urls.spotify;
    return {_id, img, track, album, albumReleaseDate, artist, trackLink, albumLink, artistLink}
}

export {getBooks, getSongs, getSongsById,searchSongs, validateUser,
    createUser, getUserLiked, addLiked, removeLiked, getBookRecommendation};
