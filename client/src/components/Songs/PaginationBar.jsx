import { useState, useRef, useEffect } from 'react';

const TOTAL_NO_ITEMS = 2500;
const ITEMS_PER_PAGE = 36;
const TOTAL_PAGES = Math.ceil(TOTAL_NO_ITEMS/ITEMS_PER_PAGE);
let leftMiddle = 2;
let middle = 3;
let rightMiddle = 4;

function PaginationBar(){
    const [currentPage, setCurrentPage] = useState(1);
    const leftSpanRef = useRef(null);
    const rightSpanRef = useRef(null);
    console.log('current page:', currentPage);
    
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
        
    },[currentPage, leftMiddle, middle, rightMiddle]);

    function handleNavTo(page){
        setCurrentPage(page);
        console.log('nav to ', page);
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
    console.log("left:",leftMiddle," middle:",middle," right:",rightMiddle);
    return(
        <div className="SongsPaginationBar">
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