import React, { useState } from "react";
import logoSmall from './../../assets/logo-small.png';

function Header(props){
    const { theme, setTheme } = props;
    
    function toggleColor(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <header className="book-header">
            <div id="header-container">
                <div className="brand">
                    <img src={logoSmall} width='30px' />
                    <h1 id="brand-name">Let's Find Your&nbsp;Book?</h1>
                </div>
                <div id="color-mode" onClick={toggleColor}>
                    {theme === 'light' ? '☀️Light Mode' : '🌙Dark Mode'}</div>
            </div>
        </header>
    )
}

export default Header;