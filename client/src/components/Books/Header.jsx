import React, { useContext} from "react";
import logoSmall from './../../assets/logo-small.png';
import { stateContext } from "../Menu/Menu";

function Header(props){
    const { setState, theme, setTheme } = useContext(stateContext);
    const { title } = props;

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
                    <img id="logo-img" onClick={handleLogoClick} src={logoSmall} width='40px' alt="logo" />
                    <h1 id="brand-name">{title}</h1>
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