import {useState, useEffect, createContext, useContext, useRef} from 'react';
import './Songs.css';
// import Header from './Header.jsx';
import Header from './../Books/Header.jsx';
import SearchBar from './SearchBar.jsx';
import PaginationBar from './PaginationBar.jsx';
import Footer from './../Books/Footer.jsx';
import defaultImg from './assets/DefaultAlbumCover.png';
import Song from './Song';
import SongExt from './SongExt.jsx';
import Loading from './Loading.jsx';
// import {state, setState, theme, setTheme , userLogged, setUserLogged} from './../Menu/Menu.jsx';
import {getSongs, getSongsById, searchSongs, getUserLiked} from './../../dataCenter.js';
import { stateContext } from '../Menu/Menu.jsx';
export const searchContext = createContext();

const _TOTAL_NO_ITEMS = 2500;
const _ITEMS_PER_PAGE = 36;
const _TOTAL_PAGES = Math.ceil(_TOTAL_NO_ITEMS/_ITEMS_PER_PAGE);

function Songs(){
    const [songs, setSongs] = useState(null);
    const [page, setPage] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [extSong, setExtSong] = useState(null);
    const { favSongs } = useContext(stateContext);
    let yPosition = parseInt(localStorage.getItem('songsYPosition')) || 0;
    const offset = currentPage * _ITEMS_PER_PAGE - _ITEMS_PER_PAGE;

    useEffect(() => {
        async function fetchData(){
            let data = await searchSongs('artists.0.name','Bob Dylan',36,offset);
            setSongs(data);
            setPage('songs');
        }
        fetchData();
    },[/*currentPage*/]);

    useEffect(() => {
        async function fetchData(){
            await onSearchClick('','Track');
            setPage('songs');
        }
        fetchData();
    },[currentPage]);

    useEffect(() => {
        if(page === 'songs'){
            window.scrollTo(0,yPosition);
        }
    },[page])
    
    function handleSongClick(props){
        // console.log('a song was clicked!');
        localStorage.setItem('songsYPosition',`${window.scrollY}`);
        setExtSong(props);
        setPage('song');
        // console.log(props);
    }
    
    async function onSearchClick(str, parameter, favBtnOn=false){
        let data;
        if(favBtnOn && favSongs){
            // data = await data.filter(song =>{
            //     return favSongs.includes(song._id);
            // });
            const ids = await favSongs.map(id => {
                return {"$oid":id};
            });
            data = await getSongsById(ids);
        }
        else{
            // if(str === ''){
            //     data = await searchSongs('artists.0.name','Bob Dylan',36, offset);
            // }
            /*else*/ if(parameter === 'Track'){
                data = await searchSongs('name', str,36, offset);
            }
            else if(parameter === 'Album'){
                data = await searchSongs('album.name', str,36, offset);
            }
            else if(parameter === 'Artist'){
                data = await searchSongs('artists.0.name', str,36, offset);
            }
        }
        // console.log(`search string:'${str}' parameter:${parameter}`);
        console.log("favBtnOn",favBtnOn);
        // console.log(data);
        setSongs(data);
    }

    return(
        <div>
            {page === 'loading' && (
                <div id="songsApp">
                    <Header/>
                    <Loading/>
                    <Footer/>
                </div>
            )}
            {page === 'songs' && (
                <div id="songsApp">
                    <Header/>
                    <searchContext.Provider value={{ onSearchClick}}>
                        <SearchBar/>
                    </searchContext.Provider>
                    <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} data={{_TOTAL_NO_ITEMS,_ITEMS_PER_PAGE,_TOTAL_PAGES}}/>
                    <div id="songsContainer" >
                        {
                            songs.map((song, index)=>{
                            return(<Song data={song} key={index} onSongClick={ handleSongClick }/>)
                            })
                        }
                    </div>
                    <Footer/>
                </div>
            )}
            {page === 'song' && (
                <div id="songsApp">
                <Header/>
                    <SongExt data={extSong} setPage={setPage} yPosition={window.scrollY.valueOf}></SongExt>
                <Footer/>
            </div>
            )}
        </div>
    );
}

export default Songs;