import { useState, useRef, useEffect } from 'react';


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

//I'm stuck. The problem is

function PaginationBar(props){
    const {currentPage, setCurrentPage} = props;
    const {_TOTAL_NO_ITEMS,_ITEMS_PER_PAGE,_TOTAL_PAGES, favBtnOn} = props.data;
    const pBar = useRef(null);
    const leftSpanRef = useRef(null);
    const rightSpanRef = useRef(null);
    // let buttons = [];
    let numOfDigitButtons = 5;

    useEffect(() => {
        handleNavTo(currentPage);
        // mark();
    },[currentPage, leftMiddle, middle, rightMiddle, favBtnOn, _TOTAL_PAGES]);
    
    useEffect(() =>{

    },[favBtnOn]);

    function mark(page = currentPage){
        // console.log("mark run!")
        const buttons = pBar.current.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('marked');
            if(parseInt(button.textContent) && parseInt(button.textContent) === page){
                button.classList.add('marked');
                // console.log(`button ${page} has been marked!`)
            }
        })
    }
    function decidePageNumbers(page){
        if(page === 1 || page === 2){
            leftMiddle = 2;
            middle = 3;
            rightMiddle = 4;
        }
        else if(page === _TOTAL_PAGES -1 || page === _TOTAL_PAGES){
            rightMiddle = _TOTAL_PAGES - 1;
            middle = rightMiddle - 1;
            leftMiddle = rightMiddle - 2;
        }
        else {
            middle = page;
            leftMiddle = page - 1;
            rightMiddle = page + 1;
        }
    }

    function decideEllipsis(page){
        if(currentPage + 1 < _TOTAL_PAGES - 1){
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
    }

    function handleNavTo(page){
        console.log('page:', page, 'total pages:',_TOTAL_PAGES)
        if(page > _TOTAL_PAGES || page < 1) return;
        setCurrentPage(page);
        decideEllipsis(page);
        if(_TOTAL_PAGES >= 5)
        {   
            document.querySelectorAll('.pBtn').forEach(button => {
                button.classList.remove('hidden');
            })
            decidePageNumbers(page);
        }
        else{
            hideButtons();
        }
    }
    function hideButtons() {
        const buttons = document.querySelectorAll('.pBtn');
        console.log("hide buttons length",buttons.length)
        console.log("hide buttons total pages",_TOTAL_PAGES)
        buttons.forEach(button => {
            console.log('@ss');
            for (let i = _TOTAL_PAGES + 1; i <= numOfDigitButtons; i++) { //from the page that shouldn't show to the number of current buttons
                if (button.classList.contains(`pBtn${i}`)) { //if the button is larger than the number of pages
                    button.classList.add('hidden');
                }
            }
        });
    }

    function handleNavToText(event){
        const page = parseInt(event.target.textContent);
        handleNavTo(page);
    }
    return(
        // <div ref={pBar} className="SongsPaginationBar">
        //     <button onClick={() => handleNavTo(currentPage - 1)}>{'<'}</button>
        //     {_TOTAL_PAGES >= 5 &&(
        //         <>
        //     <button onClick={handleNavToText}>{'1'}</button>
        //     <span ref={leftSpanRef}></span>
        //     <button onClick={handleNavToText}>{leftMiddle}</button>
        //     <button onClick={handleNavToText}>{middle}</button>
        //     <button onClick={handleNavToText}>{rightMiddle}</button>
        //     <span ref={rightSpanRef}></span>
        //     <button onClick={handleNavToText}>{_TOTAL_PAGES}</button>
        //     </>
        //     )}
        //     {_TOTAL_PAGES < 5 &&(
        //     <>
        //     {  
        //         Array.from({ length: _TOTAL_PAGES }, (_, i) => (
        //             <button key={i} onClick={handleNavToText}>
        //               {i + 1}
        //             </button>
        //           ))
        //     }
        //     </>
        //     )}
        //     <button onClick={() => handleNavTo(currentPage + 1)}>{'>'}</button>
        // </div>
        <div ref={pBar} className="SongsPaginationBar">
            <button onClick={() => handleNavTo(currentPage - 1)}>{'<'}</button>
            <button className="pBtn pBtn1" onClick={handleNavToText}>{'1'}</button>
            <span ref={leftSpanRef}></span>
            <button className="pBtn pBtn2" onClick={handleNavToText}>{leftMiddle}</button>
            <button className="pBtn pBtn3" onClick={handleNavToText}>{middle}</button>
            <button className="pBtn pBtn4" onClick={handleNavToText}>{rightMiddle}</button>
            <span ref={rightSpanRef}></span>
            <button className="pBtn pBtn5" onClick={handleNavToText}>{_TOTAL_PAGES}</button>
            <button onClick={() => handleNavTo(currentPage + 1)}>{'>'}</button>
        </div>
    );
}

export default PaginationBar;

