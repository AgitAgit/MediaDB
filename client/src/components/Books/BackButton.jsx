import React, { useContext } from "react";
import { currBook } from './Books.jsx'
import backArrow from './../../assets/back_arrow.png';

function BackButton() {
    const { selectedBook, setSelectedBook } = useContext(currBook);

    function handleBackButtonClick(event) {
        setSelectedBook(null);
    }

    return(
        <div id="back-button" onClick={handleBackButtonClick}>
            <img id="back-arrow" src={backArrow} />
            <span>Back</span>
        </div>
    )
}

export default BackButton;