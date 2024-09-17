import React, { useContext } from "react";
import { currBook } from './Books.jsx'
import BackButton from "./BackButton";

function BigCard(){
    const { selectedBook, setSelectedBook } = useContext(currBook);

    return (
    <div id="big-card-container">
        <BackButton />
        <div id="data">
            <img src={selectedBook.img} />
            <div className="book-details">
                <p><span>Title: </span>{selectedBook.title}</p>
                <p><span>Authors: </span>{selectedBook.authors.join(", ")} </p>
                <p><span>Categories: </span>{selectedBook.categories.join(", ")} </p>
                <p><span>Language: </span>{selectedBook.language} </p>
                <p><span>Published Date: </span>{selectedBook.publishedDate} </p>
                <p><span>Link: </span><a href={selectedBook.link} target="blank">Click Here</a>{}</p>
            </div>
            <div className="book-description">
                <p className="desc"><span>Description: </span>{selectedBook.description ? 
                selectedBook.description : "Unavailable..."} </p>
            </div>
        </div>
    </div>
    );
}

export default BigCard;