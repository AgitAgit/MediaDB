import './Songs.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';

// {
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
//example data:
const songData={
    img:
    defaultImg,
    _id:
    '66d82f8dc2e4f6e9ba04ecf7',
    link:
    "https://open.spotify.com/track/2uuMXKKmdXrY2XxsqTsGp0",
    spotifyId:
    "2uuMXKKmdXrY2XxsqTsGp0",
    track:
    "Immigrant Song - Remaster",
    album:
    "Led Zeppelin"}

    const songData2={
        img:
        defaultImg,
        _id:
        '66d82f8dc2e4f6e9ba04ecf7',
        link:
        "https://open.spotify.com/track/2uuMXKKmdXrY2XxsqTsGp0",
        spotifyId:
        "2uuMXKKmdXrY2XxsqTsGp0",
        track:
        "Other song",
        album:
        "Led Zeppelin"}

    
function Songs(){
    //img, title, album, artist, songLink, albumLink, artistLink
    const songs=[songData,songData2,songData,songData2]
    return(
        <div>
            <Header />
            <div id="songsContainer">
                <Song data={songData}/>
                {songs.map((song, index)=>{
                    return(<Song data={song} key={index}/>);
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Songs;