import {useState, useEffect} from 'react';

import SearchBar from './SearchBar';


function Header(props){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const {goToMenu} = props;
    
    document.documentElement.setAttribute('data-theme',theme);
    
    function toggleLightMode(){
        const newTheme = localStorage.getItem('theme') === 'light' ? 'dark':'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme',newTheme);
    }

    return(
        <header class="songsHeader" >
            <h1 id='logo' class="logo" onClick={goToMenu}>LOGO</h1>
            <button onClick={toggleLightMode}>{(theme === 'light' ? '🕶Dark mode':'💡Light mode')}</button>
        </header>
    );
}

export default Header;