import './Books.css';
import loadingGif from './../../assets/loadingGif.gif';
import React, { useState, useEffect, createContext } from 'react';
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

export const currBook = createContext();
// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchData = debounce(async () => {
            const response = await getBooks(searchText, method, 1000);
            setData(response);
        }, 300); // 300ms delay for requests
        fetchData();
        setCurrPage(1);
        // cancel pending request from before
        return () => { fetchData.cancel(); };
    }, [searchText, method]);


    useEffect(() => {
        if(!selectedBook) 
            window.scrollTo({top:scrollY,left: 0, behavior: 'smooth'})
        else
            window.scrollTo({top:0,left: 0, behavior: 'smooth'})
    }, [selectedBook])

    if (!data) // No data arrived yet -> loading page
        return <img id="loadingGif" src={loadingGif} />

    const totalPages =  Math.ceil(data.length / 24);

    function handleCardClick(element){
        setScrollY(window.scrollY);
        setSelectedBook(element);
        window.scrollTo({top:0,left: 0, behavior: 'smooth'})
    }

    function handlePageChange(newPage) {
        console.log("HERE");
        
        window.scrollTo({top:0,left: 0, behavior: 'smooth'})
        setCurrPage(newPage)
    }

    return(
    <div id="books-container">
        <Header theme={theme} setTheme={setTheme}/>
        <div id="main-content">
            { !selectedBook ?
            // ALL BOOKS
            <div id='books-search-page'>
                <BackToTop theme={theme}/>
                <div id="search-row">
                    <SearchButton theme={theme} searchText={searchText} setSearchText={setSearchText}/>
                    <FilterButton method={method} setMethod={setMethod}/>
                </div>
                    <Pagination currPage={currPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
                <div id='cards-container'>
                    {totalPages > 0 ? 
                    data
                    .slice((currPage - 1) * 24, currPage * 24)
                    .map((element, index) => <Card key={index} onClick={() => handleCardClick(element)} data={element}/>)
                    : <div id='books-not-found'>Unfortunately no such a book exists...</div>}
                </div>
                <Pagination currPage={currPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
            </div>
            : // SELECTED BOOK DISPLAY
            <currBook.Provider value={{selectedBook, setSelectedBook}}>
                <div id='book-selected-page'>
                    <BigCard />
                </div>
            </currBook.Provider>
            }
        </div>
        <Footer theme={theme}/>
    </div>
    );
}

export default Books;