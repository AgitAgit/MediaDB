import React, { useState, useContext} from "react";
import logoSmall from './../../assets/logo-small.png';
import { stateContext } from "../Menu/Menu";

function Header(props){
    const { setState } = useContext(stateContext);
    const { theme, setTheme } = props;
    
    function toggleTheme(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    function handleLogoClick() {
        setState('Menu');
    }

    return (
        <header className="book-header">
            <div id="header-container">
                <div className="brand">
                    <img id="logo-img" onClick={handleLogoClick} src={logoSmall} width='40px' />
                    <h1 id="brand-name">Let's Find Your&nbsp;Book?</h1>
                </div>
                <div className="theme-container">
                    <div id="color-mode" onClick={toggleTheme}>
                        {theme === 'light' ? '☀️Light Mode' : '🌙Dark Mode'}</div>
                </div>
            </div>
        </header>
    )
}

export default Header;