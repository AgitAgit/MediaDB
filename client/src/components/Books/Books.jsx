import './Books.css';
import loadingGif from './../../assets/loadingGif.gif';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchButton from './SearchButton'
import FilterButton from './FilterButton';
import Card from './Card'
import BigCard from './BigCard';

import getBooks from '../../dataCenter';

// RENDER RUNS COMPONENTS 2 TIMES INITIALLY DON'T BE WORRIED ABOUT LOTS OF LOGS

function Books(){
    const [colorMod, setColorMod] = useState("light");
    const [data, setData] = useState(null);
    const [method, setMethod] = useState("title");
    const [searchText, setSearchText] = useState("Harry Potter");
    const [selectedBook, setSelectedBook] = useState(null);
    
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
    // const data = [
    //     {title: "Harry Potter and the Deathly Hallows", authors: ["J. K. Rowling"], categories: ["Juvenile Fiction"] , language: "en", publishedDate: "2007-01-01", description: "\"The final adventure in J.K. Rowling's phenomenal, best-selling Harry Potter book series\"--Provided by publisher." , img: "http://books.google.com/books/content?id=JHEkAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", link: "http://books.google.com/books?id=JHEkAQAAMAAJ&q=intitle:harry+potter&dq=intitle:harry+potter&hl=&cd=1&source=gbs_api" },
    //     {title: "The Hobbit - The Lord of the Rings", authors: ["J. R. R. Tolkien"], categories: ["Fantasy fiction, English"] , language: "en", publishedDate: "2013-10-24", description: "When they were first published, THE HOBBIT and THE LORD OF THE RINGS became instant classics. Treasured by readers young and old, these works of sweeping fantasy, steeped in unrivalled magic and otherworldliness have sold more than 150 million copies around the world.This new boxed set contains both titles and features brand new cover designs. It offers readers a new opportunity to discover Tolkien's remarkable world of Middle-earth and to follow the complete story of Bilbo Baggins and the Hobbits' part in the epic quest for the Ring - beginning with Bilbo's fateful visit from Gandalf and culminating in the dramatic climax between Frodo and Gollum atop Mount Doom.", img: "http://books.google.com/books/content?id=hMpmswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", link: "http://books.google.com/books?id=hMpmswEACAAJ&dq=intitle:The+Lord+of+the+Rings&hl=&source=gbs_api" },
    // ]

    function handleCardClick(element){
        console.log(element);
        setSelectedBook(element);
    }

    
    return(
    <div id="books-container">
        <Header colorMod={colorMod} setColorMod={setColorMod}/>
        <div id="main-content">
            { !selectedBook ?
            // ALL BOOKS
            <div id='books-search-page'>
                <div id="search-row">
                    <SearchButton searchText={searchText} setSearchText={setSearchText}/>
                    <FilterButton method={method} setMethod={setMethod}/>
                </div>
                <div id='cards-container'>
                    {data.length > 0 ? data.map((element, index) => <Card key={index} onClick={() => handleCardClick(element)} data={element}/>) :
                    <div id='books-not-found'>Unfortunately no such a book exists...</div>}
                </div>
            </div>
            : // SELECTED BOOK DISPLAY
            <div id='book-selected-page'>
                <BigCard selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
            </div>
            }
        </div>
    </div>
    );
}

export default Books;