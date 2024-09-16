import {useState, useEffect} from 'react';

import SearchBar from './SearchBar';


function Header(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    useEffect(() =>{
        // setTheme(localStorage.getItem('theme') || 'light');
        const elements = document.documentElement.querySelectorAll('*');
        elements.forEach(element => element.setAttribute('data-theme',theme));
    },[])
    
    // document.documentElement.setAttribute('data-theme',theme);
    function toggleLightMode(){
        setTheme((prevTheme) =>  (prevTheme === 'light' ? 'dark':'light'));
        localStorage.setItem('theme', theme);
        const elements = document.documentElement.querySelectorAll('*');
        elements.forEach(element => element.setAttribute('data-theme',theme));
    }

    return(
        <header class="songsHeader" >
            <div class="headerL1">
                <h1 id='logo' class="logo">LOGO</h1>
            </div>
            <div class="headerL2">
                <SearchBar/>
                <button onClick={toggleLightMode}>{(theme === 'light' ? '💡Light mode':'🕶Dark mode')}</button>
            </div>
            <div class="headerL3">
            </div>
        </header>
    );
}

export default Header;