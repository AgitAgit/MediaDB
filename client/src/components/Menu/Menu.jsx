import './Menu.css';
// import './../Books/Books.css';
import Books from '../Books/Books.jsx';
import Songs from '../Songs/Songs.jsx';
import { useState, useEffect, createContext } from 'react';


import Header from '../Books/Header.jsx';
import Footer from '../Books/Footer.jsx';

export const currState = createContext();

function Menu(){
    const [state, setState] = useState('Menu');


    function onBooksClick(){
        setState('Books');
    }
    function onSongsClick(){
        setState('Songs');
    }

    return(
        <currState.Provider value={{setState}}>
        <div>
            {state === 'Books' && (
                <Books/>
            )}
            {state === 'Songs' && (
                <Songs/>
            )}
            {state === 'Menu' && (
                <div id="Menu">
                    {/* <Header /> */}
                    <button onClick={onBooksClick}>Books</button>
                    <button onClick={onSongsClick}>Songs</button>
                    {/* <Footer /> */}
                </div>
            )}
        </div>
        </currState.Provider>
    )
}

export default Menu;