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

export const currBook = createContext();
// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [scrollY, setScrollY] = useState(window.scrollY);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBooks(searchText, method);
            setData(response);
        };
        fetchData();
    }, [searchText, method]);

    useEffect(() => {
        window.scrollTo({top:scrollY,left: 0, behavior: 'smooth'})
    }, [selectedBook])

    if (!data) // No data arrived yet -> loading page
        return <img id="loadingGif" src={loadingGif} />

    function handleCardClick(element){
        setScrollY(window.scrollY);
        setSelectedBook(element);
    }


    return(
    <div id="books-container">
        <Header theme={theme} setTheme={setTheme}/>
        <div id="main-content">
            { !selectedBook ?
            // ALL BOOKS
            <div id='books-search-page'>
                <div id="search-row">
                    <SearchButton theme={theme} searchText={searchText} setSearchText={setSearchText}/>
                    <FilterButton method={method} setMethod={setMethod}/>
                </div>
                <div id='cards-container'>
                    {data.length > 0 ? data.map((element, index) => <Card key={index} onClick={() => handleCardClick(element)} data={element}/>)
                    : <div id='books-not-found'>Unfortunately no such a book exists...</div>}
                </div>
            </div>
            : // SELECTED BOOK DISPLAY
            <currBook.Provider value={{selectedBook, setSelectedBook}}>
                <div id='book-selected-page'>
                    <BigCard scrollY={scrollY}/>
                </div>
            </currBook.Provider>
            }
        </div>
        <BackToTop theme={theme}/>
    </div>
    );
}

export default Books;