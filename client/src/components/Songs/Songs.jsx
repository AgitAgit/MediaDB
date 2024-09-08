import './Songs.css';
import Song from './Song';

//example data:
const songData={_id:
    '66d82f8dc2e4f6e9ba04ecf7',
    link:
    "https://open.spotify.com/track/2uuMXKKmdXrY2XxsqTsGp0",
    spotifyId:
    "2uuMXKKmdXrY2XxsqTsGp0",
    track:
    "Immigrant Song - Remaster",
    album:
    "Led Zeppelin"}

function Songs(){
    //img, title, album, artist, songLink, albumLink, artistLink
    return(
        <Song title={songData.track} album={songData.album} artist={songData.artist} songLink={songData.link}/>
    );
}

export default Songs;