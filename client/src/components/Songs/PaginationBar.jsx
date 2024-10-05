import { useState, useRef, useEffect } from 'react';

const TOTAL_NO_ITEMS = 2500;
const ITEMS_PER_PAGE = 36;
const TOTAL_PAGES = Math.ceil(TOTAL_NO_ITEMS/ITEMS_PER_PAGE);
let leftMiddle = 2;
let middle = 3;
let rightMiddle = 4;

//Improvements:
//display numbered navigation buttons in accord with the width of the page, up to a certain maximum.


//I want the button with the current page to be marked.
//There are two methods to choose the page. The arrows and clicking.
//Ideally I would like the buttons to be iterable, and to add and remove the marker according to the current page value.
//If I rely on the numerical value and not the placement it would cover both the arrows and clicking navigation.

//So I'll get a ref to the pagination bar, create a list of all it's child nodes who are buttons. Remove the marked class from all and add
//it to the one with the fitting numerical value.

function PaginationBar(props){
    const {currentPage, setCurrentPage} = props;
    const pBar = useRef(null);
    const leftSpanRef = useRef(null);
    const rightSpanRef = useRef(null);

    // mark(currentPage);
    //When I click on the middle left or middle right buttons, it marks the button I clicked and not the one
    //with the correct value. Meaning it refers to the button that had the value at the time of clicking, and
    //not the one the turns out to have the value after the re-render. So I need somehow to trigger "mark()" 
    //after the page has been re-rendered. maybe trigger it on the onchange of pBar and have it use the current page as value.

    // useEffect(() => {
    // },[currentPage, leftMiddle, middle, rightMiddle]);
    
    useEffect(() => {
        if(currentPage + 1 < TOTAL_PAGES - 1){
            rightSpanRef.current.textContent = '...';
        }
        else {
            rightSpanRef.current.textContent = '';
        }
        if(currentPage - 1 > 2){
            leftSpanRef.current.textContent = '...';
        }
        else {
            leftSpanRef.current.textContent = '';
        }
        mark();
    },[currentPage, leftMiddle, middle, rightMiddle]);

    function mark(page = currentPage){
        const buttons = pBar.current.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('marked');
            if(parseInt(button.textContent) && parseInt(button.textContent) === page){
                button.classList.add('marked');
            }
        })
    }

    function handleNavTo(page){
        if(page > TOTAL_PAGES || page < 1) return;
        setCurrentPage(page);
        if(TOTAL_PAGES >= 5)
        {
            if(page === 1 || page === 2){
                leftMiddle = 2;
                middle = 3;
                rightMiddle = 4;
            }
            else if(page === TOTAL_PAGES -1 || page === TOTAL_PAGES){
                rightMiddle = TOTAL_PAGES - 1;
                middle = rightMiddle - 1;
                leftMiddle = rightMiddle - 2;
            }
            else {
                middle = page;
                leftMiddle = page - 1;
                rightMiddle = page + 1;
            }
        }
        else{

        }

        // if(currentPage + 1 < TOTAL_PAGES - 1){
        //     rightSpanRef.current.textContent = '...';
        // }
        // else {
        //     rightSpanRef.current.textContent = '';
        // }
        // if(currentPage - 1 > 2){
        //     leftSpanRef.current.textContent = '...';
        // }
        // else {
        //     leftSpanRef.current.textContent = '';
        // }
    }

    function handleNavToText(event){
        const page = parseInt(event.target.textContent);
        handleNavTo(page);
    }
    return(
        <div ref={pBar} className="SongsPaginationBar">
            <button onClick={() => handleNavTo(currentPage - 1)}>{'<'}</button>
            <button onClick={handleNavToText}>{'1'}</button>
            <span ref={leftSpanRef}></span>
            <button onClick={handleNavToText}>{leftMiddle}</button>
            <button onClick={handleNavToText}>{middle}</button>
            <button onClick={handleNavToText}>{rightMiddle}</button>
            <span ref={rightSpanRef}></span>
            <button onClick={handleNavToText}>{TOTAL_PAGES}</button>
            <button onClick={() => handleNavTo(currentPage + 1)}>{'>'}</button>
        </div>
    );
}

export default PaginationBar;