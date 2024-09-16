import './Books.css';
import loadingGif from './../../assets/loadingGif.gif';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchButton from './SearchButton'
import FilterButton from './FilterButton';
import Card from './Card'
import {getBooks} from '../../dataCenter';
import BigCard from './BigCard';


// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("Harry Potter");
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

    // console.log("IN BOOKS:", data);

    if (!data) // No data arrived yet -> loading
        return <img id="loadingGif" src={loadingGif} />

    function handleCardClick(element){
        setScrollY(window.scrollY);
        setSelectedBook(element);
    }

    window.scrollTo({top:scrollY,left: 0, behavior: 'smooth'})

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
                    {data.length > 0 ? data.map((element, index) => <Card key={index} onClick={() => handleCardClick(element)} data={element}/>) :
                    <div id='books-not-found'>Unfortunately no such a book exists...</div>}
                </div>
            </div>
            : // SELECTED BOOK DISPLAY
            <div id='book-selected-page'>
                <BigCard scrollY={scrollY} selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
            </div>
            }
        </div>
    </div>
    );
}

export default Books;