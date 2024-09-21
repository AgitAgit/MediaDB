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
import SelectionMenu from './SelectionMenu.jsx';

export const stateContext = createContext();

function Menu(){
    const [state, setState] = useState('Menu');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [loginForm, setLoginForm] = useState(true);
    const [userLogged, setUserLogged] = useState(null);

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    function toggleTheme(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    const handleLoginClick = () => {
        setLoginForm(true);
    };

    const handleSignupClick = () => {
        setLoginForm(false);
    };
    function onBooksClick(){
        setState('Books');
    }
    function onSongsClick(){
        setState('Songs');
    }

    return(
        <stateContext.Provider value={{state, setState, theme, setTheme , userLogged, setUserLogged}}>
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
                        { !userLogged ? 
                        //NO USER LOGGED
                        <div className="form-container">
                            <div id="menu-theme" onClick={toggleTheme}>
                            {theme === 'light' ? '☀️' : '🌙'}</div>
                            <div className="button-box">
                                <div id="btn"
                                style={{left: loginForm ? "0px" : "110px",}}
                                ></div>
                                <button className="toggle-btn" onClick={handleLoginClick}>Log in</button>
                                <button className="toggle-btn" onClick={handleSignupClick}>Sign up</button>
                            </div>
                                {loginForm ? <Login /> : <Signup />}
                        </div>
                        : // USER LOGGED
                        <SelectionMenu />
                        }
                        <div className='logo-container'>
                            <img id='logo-large-menu' src={logoLarge} />
                            <h1>Your Playlist<br/> of Stories</h1>
                        </div>
                    </div>
                </div>
            )}
        </stateContext.Provider>
    )
}

export default Menu;