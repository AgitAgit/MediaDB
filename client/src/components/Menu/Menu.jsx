import './Menu.css';
import Books from '../Books/Books.jsx';
import Songs from '../Songs/Songs.jsx';
import { useState } from 'react';

function Menu(){
    const [state, setState] = useState('Menu');

    function onBooksClick(){
        setState('Books');
    }
    function onSongsClick(){
        setState('Songs');
    }
    if(state === 'Menu'){
        return(
            <div id="Menu">
                <button onClick={onBooksClick}>Books</button>
                <button onClick={onSongsClick}>Songs</button>
            </div>
        )
    }
    else if(state === 'Books'){
        return <Books/>
    }
    else if(state === 'Songs'){
        return <Songs/>
    }
}

export default Menu;