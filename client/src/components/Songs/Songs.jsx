import {useState, useEffect, createContext, useContext} from 'react';
import './Songs.css';
// import Header from './Header.jsx';
import Header from './../Books/Header.jsx';
import Footer from './../Books/Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs, searchSongs} from './../../dataCenter.js';
import Loading from './Loading.jsx';
import SearchBar from './SearchBar.jsx';
import {state, setState, theme, setTheme , userLogged, setUserLogged} from './../Menu/Menu.jsx';
import SongExt from './SongExt.jsx';
export const searchContext = createContext();


function Songs(){
    const [songs, setSongs] = useState(null);
    const [page, setPage] = useState('loading');
    const [extSong, setExtSong] = useState(null);
    const [yPosition, setYPosition] = useState(0);
    window.scrollTo(0,yPosition);

    useEffect(() => {
        async function fetchData(){
            const data = await searchSongs('artists.0.name','Bob Dylan',36);
            //console.log(data);
            setSongs(data);
            setPage('songs');
        }
        fetchData();
    },[]);

    function handleSongClick(props){
        console.log('a song was clicked!');
        setYPosition(window.scrollY);
        setExtSong(props);
        setPage('song');
        console.log(props);
    }

    async function onSearchClick(str, parameter){
        let data;

        if(parameter === 'Track'){
            data = await searchSongs('name', str,36);
        }
        else if(parameter === 'Album'){
            data = await searchSongs('album.name', str,36);
        }
        else if(parameter === 'Artist'){
            data = await searchSongs('artists.0.name', str,36);
        }
        //console.log(data);
        setSongs(data);
    }

    return(
        <div>
            {page === 'loading' && (
                <div>
                    <Header/>
                    <Loading/>
                    <Footer/>
                </div>
            )}
            {page === 'songs' && (
                <div id="songsApp">
                    <Header/>
                    <searchContext.Provider value={onSearchClick}>
                        <SearchBar/>
                    </searchContext.Provider>
                    <div id="songsContainer">
                        {songs.map((song, index)=>{
                            return(<Song data={song} key={index} onSongClick={ handleSongClick }/>);//handleSongClick(song)
                        })}
                    </div>
                    <Footer/>
                </div>
            )}
            {page === 'song' && (
                <div>
                <Header/>
                <SongExt data={extSong} setPage={setPage}></SongExt>
                <Footer/>
            </div>
            )}
        </div>
    );
}

export default Songs;