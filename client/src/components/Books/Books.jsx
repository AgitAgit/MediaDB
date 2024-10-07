import './Books.css';
import React, { useState, useEffect, createContext, useContext, useRef} from 'react';
import Header from './Header';
import SearchButton from './SearchButton'
import FilterButton from './FilterButton';
import Card from './Card'
import {getBooks} from '../../dataCenter';
import BigCard from './BigCard';
import BackToTop from './BackToTop';
import Pagination from './Pagination';
import debounce from 'lodash.debounce';
import Footer from './Footer';
import Loading from '../Songs/Loading';
import { stateContext } from '../Menu/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const currBook = createContext();
// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(){
    const { favBooks, setState, userLogged, setUserLogged } = useContext(stateContext);
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [triggerSearch, setTriggerSearch] = useState(true);
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [currPage, setCurrPage] = useState(1);
    const [favorites, setFavorites] = useState(false);
    const favButtonRef = useRef(null);
    const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
    let totalPages;

    useEffect(() => {
        setData(null);
        const controller = new AbortController();
        const { signal } = controller;
    
        const fetchData = debounce(async () => {
            try {
                let response = await getBooks(searchText, method, 1000, favorites, favBooks, { signal });
                if (!signal.aborted) {
                    setData(response); // Update state only if the request wasn't canceled
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Fetch failed:", error);
                }
            }
        }, 200); // 200 ms delay for requests
    
        fetchData();
        setCurrPage(1);
        // Cleanup function to cancel the previous request and debounce
        return () => {
            fetchData.cancel();      // Cancel the debounce
            controller.abort();      // Abort the ongoing request
        };
    }, [searchText, method, triggerSearch, favorites]);

    useEffect(() => {
        if(!selectedBook) 
            window.scrollTo({top:scrollY,left: 0, behavior: 'smooth'})
        else
            window.scrollTo({top:0,left: 0, behavior: 'smooth'})
    }, [selectedBook])

    if(data) totalPages =  Math.ceil(data.length / 24);

    function handleCardClick(element){
        setScrollY(window.scrollY);
        setSelectedBook(element);
        window.scrollTo({top:0,left: 0, behavior: 'smooth'});
    }
    function handlePageChange(newPage) {
        window.scrollTo({top:0,left: 0, behavior: 'smooth'});
        setCurrPage(newPage);
    }
    function toggleFavorites() {
        if(userLogged === "guest")
            setIsLoginPopupVisible(true);
        else
            setFavorites(prev => !prev);
    }
    function toggleLoginPopUp() {
        setIsLoginPopupVisible(false);
    }
    function handleBackToLogin() {
        setState("Menu");
        setUserLogged(null);
    }

    return(
    <div id="books-container">
        <div>
        <currBook.Provider value={{selectedBook, setSelectedBook, favorites, setIsLoginPopupVisible, setTriggerSearch}}>
        {isLoginPopupVisible && (
            <div className="overlay">
                <div className="popup">
                    <p><span>Please Login First!</span><br/> Only subscribed members can like & save their favorites</p>
                    <FontAwesomeIcon icon={faXmark} className='pop-msg-x' onClick={toggleLoginPopUp} beatFade style={{color: "#ce1c1c",}} />
                    <div className='flex'>
                        <button className="menu-button" onClick={toggleLoginPopUp}>Continue as guest</button>
                        <button className="menu-button" onClick={handleBackToLogin}>Login / Signup</button>
                    </div>
                </div>
            </div>)}
            <Header title={"Let's Find Your\u00A0Book?"} />
            <div id="main-content">
            { !selectedBook ?
            // ALL BOOKS
            <div id='books-search-page'>
                <BackToTop/>
                <div id="search-row">
                    <SearchButton searchText={searchText} setSearchText={setSearchText}
                    setTriggerSearch={setTriggerSearch}/>
                    <button className={"favorites-button" + (favorites ? " button-checked": "")} ref={favButtonRef} onClick={toggleFavorites}>Favorites</button>
                    <FilterButton method={method} setMethod={setMethod}/>
                </div>
                    <Pagination currPage={currPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
                <div id='cards-container'>
                    {(!data) ?
                        <Loading /> :
                    (totalPages > 0 ?
                    data
                    .slice((currPage - 1) * 24, currPage * 24)
                    .map((element, index) => <Card key={index} onClick={() => handleCardClick(element)} data={element}/>)
                    : <div id='books-not-found'>
                        {favorites ? "You haven't liked anything yet": "Unfortunately no such a book exists..."}</div>)}
                </div>
                <Pagination currPage={currPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
            </div>
            : // SELECTED BOOK DISPLAY
                <div id='book-selected-page'>
                    <BigCard />
                </div>
            }
        </div>
        </currBook.Provider>
        </div>
        <Footer/>
    </div>
    );
}

export default Books;