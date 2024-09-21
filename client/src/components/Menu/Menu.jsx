import './Menu.css';
// import './../Books.css'
import logoLarge from './../../assets/logo-small.png'
import Books from '../Books/Books.jsx';
import Songs from '../Songs/Songs.jsx';
import { useState, useEffect, createContext } from 'react';

import Header from '../Books/Header.jsx';
import Footer from '../Books/Footer.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export const stateContext = createContext();

function Menu(){
    const [state, setState] = useState('Menu');
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // useEffect(() => {
    //     document.documentElement.setAttribute('data-theme', theme);
    //     localStorage.setItem('theme', theme);
    // }, [theme]);

    function toggleTheme(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    const handleLoginClick = () => {
        setIsLoginActive(true);
    };

    const handleSignupClick = () => {
        setIsLoginActive(false);
    };
    function onBooksClick(){
        setState('Books');
    }
    function onSongsClick(){
        setState('Songs');
    }

    return(
            <stateContext.Provider value={{state, setState, theme, setTheme}}>
                {state === 'Books' && (
                    <Books/>
                )}
                {state === 'Songs' && (
                    <Songs/>
                )}
                {state === 'Menu' &&(
                    <div id="Menu">
                        <div id='main-content-menu'>
                            <button className='temp1' onClick={onBooksClick}>Books</button>
                            <button className='temp2' onClick={onSongsClick}>Songs</button>
                            <div className='background'></div>
                            <div className="form-container">
                                <div id="menu-theme" onClick={toggleTheme}>
                                {theme === 'light' ? '☀️' : '🌙'}</div>
                                <div className="button-box">
                                    <div id="btn"
                                    style={{left: isLoginActive ? "0px" : "110px",}}
                                    ></div>
                                    <button className="toggle-btn" onClick={handleLoginClick}>Log in</button>
                                    <button className="toggle-btn" onClick={handleSignupClick}>Sign up</button>
                                </div>
                                    {isLoginActive ? <Login /> : <Signup />}
                                    
                            </div>
                            <div className='logo-container'>
                                <img id='logo-large-menu' src={logoLarge} />
                                {/* <h1>Find Your Art</h1> */}
                                <h1>Your Playlist<br/> of Stories</h1>
                            </div>

                        </div>
                    </div>
                )}
            </stateContext.Provider>
    )
}

export default Menu;