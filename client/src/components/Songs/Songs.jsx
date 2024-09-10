import {useState, useEffect} from 'react';
import './Songs.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs} from './../../dataCenter.js';
    
function Songs(){
    const [songs, setSongs] = useState(null);
    //const songs = [{track:"name"},{track:"name2"}]
    useEffect(() => {
        async function fetchData(){
            const data = await getSongs({},3);
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
        <div>
            <Header />
            <div id="songsContainer">
                <Song data={songs[0]}/>
                {songs.map((song, index)=>{
                    return(<Song data={song} key={index}/>);
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Songs;