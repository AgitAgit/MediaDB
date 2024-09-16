import defaultImg from './assets/book_img_not_available.png';
import axios from 'axios';

const _SERVER_ADDRESS = 'https://mediadb-91464205485.us-central1.run.app';
const _LOCAL_SERVER_ADDRESS = 'http://localhost';
const _SERVER_PORT = 8080;

const _CURRENT_ADDRESS = _SERVER_ADDRESS;


function getBooks(searchText, method){
    const filter = {};
    filter[method] = { $regex: searchText, $options: "i"};
    
    return fetch(`${_CURRENT_ADDRESS}:${_SERVER_PORT}/api/data/book/get`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({filter})
    })
    .then(response => response.json())
    .then(data => {
        // console.log("data on center is", data);
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
    return axios.post(`${_CURRENT_ADDRESS}:${_SERVER_PORT}/api/data/song/get`,{
        filter,
        limit
    })
    .then(songs => {
        return songs.data.map(song => {
            const process = processSong(song);
            console.log(process);
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


function processSong(song){
    const track = song.name;
    const album = song.album.name;
    const artist = song.artists[0].name;
    const img = song.album.images[0].url;
    const trackLink = song.external_urls.spotify;
    const albumLink = song.album.external_urls.spotify;
    const artistLink = song.artists[0].external_urls.spotify;
    return {img, track, album, artist, trackLink, albumLink, artistLink}
}

export {getBooks, getSongs, searchSongs};
