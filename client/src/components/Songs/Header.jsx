import {useState, useEffect, useContext} from 'react';

import SearchBar from './SearchBar';

import { stateContext } from './../Menu/Menu';

function Header(props){
    const [theme, setTheme] = props.theme;//useState(localStorage.getItem('theme') || 'light');
    const {state, setState} = useContext(stateContext);

    document.documentElement.setAttribute('data-theme',theme);
    
    function toggleLightMode(){
        const newTheme = localStorage.getItem('theme') === 'light' ? 'dark':'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme',newTheme);
    }

    return(
        <header className="songsHeader" >
            <h1 id='logo' class="logo" onClick={() => setState('Menu')}>LOGO</h1>
            <button onClick={toggleLightMode}>{(theme === 'light' ? '🕶Dark mode':'💡Light mode')}</button>
        </header>
    );
}

export default Header;