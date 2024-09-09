import React, { useState } from "react";

function Header(props){
    const { colorMod, setColorMod } = props;
    function toggleColor(){
        setColorMod(c => c === 'light' ? "dark" : 'light');
    }

    return (
        <header>
            <div id="header-container">
                <div id="brand-name">Let's Find Your&nbsp;Book?</div>
                <div id="color-mode" onClick={toggleColor}>
                    {colorMod === 'light' ? '☀️Light Mode' : '🌙Dark Mode'}</div>
            </div>
        </header>
    )
}

export default Header;