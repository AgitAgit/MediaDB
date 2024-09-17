import React, { useState } from "react";

function Header(props){
    const { theme, setTheme } = props;
    
    function toggleColor(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    return (
        <header className="book-header">
            <div id="header-container">
                <h1 id="brand-name">Let's Find Your&nbsp;Book?</h1>
                <div id="color-mode" onClick={toggleColor}>
                    {theme === 'light' ? '☀️Light Mode' : '🌙Dark Mode'}</div>
            </div>
        </header>
    )
}

export default Header;