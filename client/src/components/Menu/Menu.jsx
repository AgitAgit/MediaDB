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
import { getUserLiked } from '../../dataCenter.js';

export const stateContext = createContext();

function Menu(){
    const [state, setState] = useState('Menu');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [currForm, setCurrForm] = useState("login");
    const [userLogged, setUserLogged] = useState(null);
    const [favBooks, setFavBooks] = useState([]);
    const [favSongs, setFavSongs] = useState([]);

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    useEffect(() => {
        const fetchFavorites = async () => {
            if(userLogged && userLogged !== "guest") {
                try {
                    setFavBooks(await getUserLiked(userLogged, 'books'));
                    setFavSongs(await getUserLiked(userLogged, 'songs'));
                }
                catch(err) {
                    console.log("Client Error getting favorites: " + err);
                }
            }
        };
        fetchFavorites();
    }, [userLogged]);

    function toggleTheme(){
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    const handleLoginClick = () => {
        setCurrForm("login");
    };
    const handleSignupClick = () => {
        setCurrForm("signup");
    };

    return(
        <stateContext.Provider value={{state, setState, theme, setTheme , userLogged, setUserLogged, favBooks, setFavBooks, favSongs, setFavSongs}}>
            {state === 'Books' && (
                <Books/>
            )}
            {state === 'Songs' && (
                <Songs/>
            )}
            {state === 'Menu' &&(
                <div id="Menu">
                    <div id='main-content-menu'>
                        <div className='background'></div>
                        <div className="form-container">
                            <div id="menu-theme" onClick={toggleTheme}>
                            {theme === 'light' ? '☀️' : '🌙'}</div>
                            { !userLogged ? //NO USER LOGGED
                            <><div className="button-box">
                                <div id="btn"
                                style={{left: currForm === "login" ? "0px" : "110px",}}
                                ></div>
                                <button className="toggle-btn" onClick={handleLoginClick}>Log in</button>
                                <button className="toggle-btn" onClick={handleSignupClick}>Sign up</button>
                            </div>
                                {currForm === "login" ? <Login /> : <Signup setCurrForm={setCurrForm} />}
                                </>
                        : // USER LOGGED
                        <SelectionMenu />
                        }
                        </div>
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