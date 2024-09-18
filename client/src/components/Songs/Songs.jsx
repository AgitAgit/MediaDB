import {useState, useEffect, createContext} from 'react';
import './Songs.css';
import Header from './Header.jsx';
import Footer from './../Books/Footer.jsx';
import Song from './Song';
import defaultImg from './assets/DefaultAlbumCover.png';
import {getSongs, searchSongs} from './../../dataCenter.js';
import Loading from './Loading.jsx';
import SearchBar from './SearchBar.jsx';
import Menu from './../Menu/Menu.jsx';

export const searchContext = createContext();


function Songs(){
    const [songs, setSongs] = useState(null);
    const [page, setPage] = useState('loading');

    useEffect(() => {
        async function fetchData(){
            const data = await searchSongs('artists.0.name','Bob Dylan',36);
            console.log(data);
            setSongs(data);
            setPage('songs');
        }
        fetchData();
    },[]);
    
    function goToMenu(){
        setPage('Menu');
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
        console.log(data);
        setSongs(data);
    }

    return(
        <div>
            {page === 'loading' && (
                <Loading/>
            )}
            {page === 'songs' && (
                <div id="songsApp">
                    <Header goToMenu={goToMenu}/>
                    <searchContext.Provider value={onSearchClick}>
                        <SearchBar/>
                    </searchContext.Provider>
                    <div id="songsContainer">
                        {songs.map((song, index)=>{
                            return(<Song data={song} key={index}/>);
                        })}
                    </div>
                    <Footer theme={localStorage.getItem('theme') || 'light'}/>
                </div>
            )}
            {page === 'Menu' && (
                <Menu/>
            )}
        </div>
    );
}

export default Songs;