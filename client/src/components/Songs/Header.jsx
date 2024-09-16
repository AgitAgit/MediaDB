import {useState, useEffect} from 'react';

import SearchBar from './SearchBar';


function Header(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    document.documentElement.setAttribute('data-theme',theme);
    
    function toggleLightMode(){
        setTheme((prevTheme) =>  (prevTheme === 'light' ? 'dark':'light'));
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme',theme);
    }

    return(
        <header class="songsHeader" >
            <h1 id='logo' class="logo">LOGO</h1>
            <button onClick={toggleLightMode}>{(theme === 'light' ? '🕶Dark mode':'💡Light mode')}</button>
        </header>
    );
}

export default Header;