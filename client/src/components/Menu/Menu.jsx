import './Menu.css';
import Books from '../Books/Books.jsx';
import Songs from '../Songs/Songs.jsx';
import { useState, useEffect } from 'react';

function Menu(){
    const [state, setState] = useState('Menu');


    function onBooksClick(){
        setState('Books');
    }
    function onSongsClick(){
        setState('Songs');
    }

    return(
        <div>
            {state === 'Books' && (
                <Books/>
            )}
            {state === 'Songs' && (
                <Songs/>
            )}
            {state === 'Menu' &&(
                <div id="Menu">
                    <button onClick={onBooksClick}>Books</button>
                    <button onClick={onSongsClick}>Songs</button>
                </div>
            )}
        </div>
    )
}

export default Menu;