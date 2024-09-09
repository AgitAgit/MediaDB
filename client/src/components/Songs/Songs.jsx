import './Songs.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';


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