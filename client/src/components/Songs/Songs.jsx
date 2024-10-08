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


//need to add pagination for the favorites mode.  DONE
//probably need to add offset to the getById in the data center

//I need to lift the state of favBtn from searchBar to songs, and modify the handleFavoritesClick
//function accordingly. DONE

//I need to add a function that runs when the client closes to get the y position back to 0.
//I can add it as a useEffect for songs that runs only once. DONE

//What about searching by artist instead of track, or when searching for a different text, 
//and the page remains the same? Where do I turn the page back to 1 to change this behaviour?
//onChange of the search value and the search option value. also when favorites value changes. DONE

//When setCurrentPage(1) is called from outside the pagination bar, and the current page is larger than 3,
//the middle buttons display doesn't update. FIXED.

//Add search functionality within favorites DONE.

//Refresh favorites when the like is clicked DONE.

//Favorites button should be marked more clearly when in favorites mode. DONE.

//Add a bit more minimal space between the cards in songs DONE.

//Large card dark mode backarrow is misaligned. FIXED.

//Improve small size responsiveness for the large card DONE.

//Change the pagination bar so It shows the number of pages with accordance to the number of available
//results. DONE.

//When clicking from favorites back to normal mode, the ... symbol disappears.
//It happens because the useEffect in pagination bar is not running when switching from favorites to
//normal mode.
//Partially true. It might be also related to the conditional rendering in the pagination.
//a mark class is added to an element but it is recreated without it when rendering?
//FIXED.

//the artists in db feature's behavior isn't well integrated with the search/pagination/favorites mode

//when removing liked songs from the favorites mode, the number of pages is not refreshed when the number
//of liked songs becomes small enough to leave empty pages.
function Songs(){
    const itemsInCollection = 2500;
    const [totalNoItems, setTotalNoItems] = useState(itemsInCollection);//number of docs in collection
    const _ITEMS_PER_PAGE = 36;
    const _TOTAL_PAGES = Math.ceil(totalNoItems/_ITEMS_PER_PAGE);
    const [songs, setSongs] = useState(null);
    const [page, setPage] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [extSong, setExtSong] = useState(null);
    const [favBtnOn, setFavBtnOn] = useState(false);
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
        localStorage.setItem('songsYPosition','0');
        yPosition = 0;
    },[]);//leave the dependency array empty here.

    useEffect(() => {
        async function fetchData(){
            await onSearchClick('','Track');
            setPage('songs');
        }
        fetchData();
    },[currentPage, favBtnOn]);

    useEffect(() => {
        if(page === 'songs'){
            window.scrollTo(0,yPosition);
        }
    },[page])
    
    useEffect(()=>{
        setCurrentPage(1);
        if(favBtnOn){
            setTotalNoItems(favSongs.length);
        }
        else{
            setTotalNoItems(itemsInCollection);
        }
    },[favBtnOn]);

    //refresh the favorite songs view when a favorite is removed
    useEffect(() => {
        handleFavoritesChange();
    },[favSongs]);

    function handleFavoritesChange(){
        if(favBtnOn){
            onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value);
        }
    }

    function handleSongClick(props){
        // console.log('a song was clicked!');
        localStorage.setItem('songsYPosition',`${window.scrollY}`);
        setExtSong(props);
        setPage('song');
        // console.log(props);
    }
    
    async function onSearchClick(str, parameter){
        let data;
        let field;
        if(parameter === 'Track') field = 'name';
        else if(parameter === 'Album') field = 'album.name';
        else if(parameter === 'Artist') field = 'artists.0.name';

        if(favBtnOn && favSongs){
            const ids = await favSongs.map(id => {
                return {"$oid":id};
            });
            data = await getSongsById(ids, 36, offset, field, str);
        }
        else{
            data = await searchSongs(field, str,36, offset);
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
                    <searchContext.Provider value={{ onSearchClick, favBtnOn, setFavBtnOn, setCurrentPage}}>
                        <SearchBar/>
                    </searchContext.Provider>
                    <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} data={{_TOTAL_NO_ITEMS: totalNoItems,_ITEMS_PER_PAGE,_TOTAL_PAGES, favBtnOn}}/>
                    <div id="songsContainer" >
                        {
                            songs.map((song, index)=>{
                            return(<Song data={song} key={index} onSongClick={ handleSongClick }/>)
                            })
                        }
                    </div>
                    <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} data={{_TOTAL_NO_ITEMS: totalNoItems,_ITEMS_PER_PAGE,_TOTAL_PAGES, favBtnOn}}/>
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