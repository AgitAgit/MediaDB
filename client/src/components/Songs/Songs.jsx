import {useState, useEffect, createContext, useContext} from 'react';
import './Songs.css';
import Header from './Header.jsx';
import Footer from './../Books/Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs, searchSongs} from './../../dataCenter.js';
import Loading from './Loading.jsx';
import SearchBar from './SearchBar.jsx';
import { stateContext } from './../Menu/Menu.jsx';
import SongExt from './SongExt.jsx';
export const searchContext = createContext();


function Songs(){
    const [songs, setSongs] = useState(null);
    const [page, setPage] = useState('loading');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [extSong, setExtSong] = useState(null);
    const {state, setState} = useContext(stateContext);


    useEffect(() => {
        async function fetchData(){
            const data = await searchSongs('artists.0.name','Bob Dylan',36);
            //console.log(data);
            setSongs(data);
            setPage('songs');
        }
        fetchData();
    },[]);
    
    function goToMenu(){
        setState('Menu');
    }

    function handleSongClick({song}){
        console.log('a song was clicked!');
        setPage('song');
        setExtSong(song);
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
                <Loading/>
            )}
            {page === 'songs' && (
                <div id="songsApp">
                    <Header goToMenu={goToMenu} theme={[theme, setTheme]}/>
                    <searchContext.Provider value={onSearchClick}>
                        <SearchBar/>
                    </searchContext.Provider>
                    <div id="songsContainer">
                        {songs.map((song, index)=>{
                            return(<Song data={song} key={index} onClick={ () => console.log('click!') }/>);//handleSongClick(song)
                        })}
                    </div>
                    <Footer theme={theme}/>
                </div>
            )}
            {page === 'song' && (
                <SongExt data={extSong}></SongExt>
            )}
        </div>
    );
}

export default Songs;