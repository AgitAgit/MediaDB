import defaultImg from './assets/book_img_not_available.png';
import axios from 'axios';

const _SERVER_ADDRESS = 'https://mediadb-91464205485.us-central1.run.app';
const _LOCAL_SERVER_ADDRESS = 'http://localhost';
const _SERVER_PORT = 8080;

const _CURRENT_ADDRESS = _LOCAL_SERVER_ADDRESS;


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
        console.log("data on center is", data);
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

// let song =    {
//     "_id": "66deb90b4d3c32b9d7ad72e1",
//     "album": {
//         "album_type": "album",
//         "artists": [
//             {
//                 "external_urls": {
//                     "spotify": "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY"
//                 },
//                 "href": "https://api.spotify.com/v1/artists/4dpARuHxo51G3z768sgnrY",
//                 "id": "4dpARuHxo51G3z768sgnrY",
//                 "name": "Adele",
//                 "type": "artist",
//                 "uri": "spotify:artist:4dpARuHxo51G3z768sgnrY"
//             }
//         ],
//         "external_urls": {
//             "spotify": "https://open.spotify.com/album/0Lg1uZvI312TPqxNWShFXL"
//         },
//         "href": "https://api.spotify.com/v1/albums/0Lg1uZvI312TPqxNWShFXL",
//         "id": "0Lg1uZvI312TPqxNWShFXL",
//         "images": [
//             {
//                 "height": 640,
//                 "url": "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300",
//                 "width": 640
//             },
//             {
//                 "height": 300,
//                 "url": "https://i.scdn.co/image/ab67616d00001e022118bf9b198b05a95ded6300",
//                 "width": 300
//             },
//             {
//                 "height": 64,
//                 "url": "https://i.scdn.co/image/ab67616d000048512118bf9b198b05a95ded6300",
//                 "width": 64
//             }
//         ],
//         "name": "21",
//         "release_date": "2011-01-24",
//         "release_date_precision": "day",
//         "total_tracks": 11,
//         "type": "album",
//         "uri": "spotify:album:0Lg1uZvI312TPqxNWShFXL"
//     },
//     "artists": [
//         {
//             "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY"
//             },
//             "href": "https://api.spotify.com/v1/artists/4dpARuHxo51G3z768sgnrY",
//             "id": "4dpARuHxo51G3z768sgnrY",
//             "name": "Adele",
//             "type": "artist",
//             "uri": "spotify:artist:4dpARuHxo51G3z768sgnrY"
//         }
//     ],
//     "duration_ms": 285240,
//     "explicit": false,
//     "external_ids": {
//         "isrc": "GBBKS1000351"
//     },
//     "external_urls": {
//         "spotify": "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV"
//     },
//     "href": "https://api.spotify.com/v1/tracks/1zwMYTA5nlNjZxYrvBB2pV",
//     "id": "1zwMYTA5nlNjZxYrvBB2pV",
//     "is_local": false,
//     "name": "Someone Like You",
//     "popularity": 79,
//     "preview_url": "https://p.scdn.co/mp3-preview/a79d612cac9b64e900ae937234e2838a88ebc415?cid=dfa2522400934fe6b7005ca8ddc3add9",
//     "track_number": 11,
//     "type": "track",
//     "uri": "spotify:track:1zwMYTA5nlNjZxYrvBB2pV"
// }
function processSong(song){
    const img = song.album.images[0].url;
    const track = song.name;
    const album = song.album.name;
    const artist = song.artists[0].name;
    const trackLink = song.external_urls.spotify;
    const albumLink = song.album.external_urls.spotify;
    const artistLink = song.artists[0].external_urls.spotify;
    return {img, track, album, artist, trackLink, albumLink, artistLink}
}

export {getBooks, getSongs};
