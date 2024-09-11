import {useState, useEffect} from 'react';
import './Songs.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs, searchSongs} from './../../dataCenter.js';
    
function Songs(){
    const [songs, setSongs] = useState(null);
    //const songs = [{track:"name"},{track:"name2"}]
    useEffect(() => {
        async function fetchData(){// "artists.0.name": { $regex: new RegExp("Led")} 
            const data = await searchSongs('artists.0.name','Bob Dylan',10);
            console.log(data);
            setSongs(data);
        }
        fetchData();
    },[]);

    if(!songs){
        return(
            <div>oops...</div>
        )
    }
    else return(
        <div data-theme="light">
            <Header />
            <div id="songsContainer">
                {songs.map((song, index)=>{
                    return(<Song data={song} key={index}/>);
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Songs;