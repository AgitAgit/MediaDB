import './Books.css';
import loadingGif from './../../assets/loadingGif.gif';
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
import { faV } from '@fortawesome/free-solid-svg-icons';

export const currBook = createContext();
// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(props){
    const { theme, setTheme, favBooks } = useContext(stateContext);
    const { setState } = props;
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [triggerSearch, setTriggerSearch] = useState(true);
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [currPage, setCurrPage] = useState(1);
    const [favorites, setFavorites] = useState(false);
    const favButtonRef = useRef(null);
    let totalPages;

    
    useEffect(() => {
        const fetchData = debounce(async () => {
            console.log("CLIENT", favBooks);
            
            let response = await getBooks(searchText, method, 1000, favorites, favBooks);
            setData(response);
            console.log(data);
            
        }, 300); // 300ms delay for requests
        fetchData();
        setCurrPage(1);
        // cancel pending request from before
        return () => { fetchData.cancel(); };
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
        setFavorites(prev => !prev);
    }

    return(
    <div id="books-container">
        <div>
        <Header/>
        <div id="main-content">
        <currBook.Provider value={{selectedBook, setSelectedBook, favorites}}>
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
        </currBook.Provider>
        </div>
        </div>
        <Footer/>
    </div>
    );
}

export default Books;