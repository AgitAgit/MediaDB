import {useContext} from 'react';
import {searchContext} from './Songs';
import searchIcon from './../../assets/search1.svg';
// import { stateContext } from '../Menu/Menu';
function SearchBar(){
    const { onSearchClick, favBtnOn, setFavBtnOn } = useContext(searchContext);
    function handleFavoritesClick(event){
        event.target.classList.toggle('btnClicked');
        setFavBtnOn(favBtnOn => !favBtnOn);
        console.log(`from handleFavoritesClick favBtnOn: ${favBtnOn}`)
        onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value);
        //now I need to add to a context the favorites btn state,
        //and display songs based on that.
    }
    return(
        <div className="searchBar">
            <div className="searchField">
                <img id="searchIcon" src={searchIcon} alt='search icon'></img>
                <input id="searchInput" onChange={() => onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)}>
                </input>
            </div>
            <div className="favoritesDiv">
                <button className="favoritesBtn" onClick={handleFavoritesClick}>Favorites</button>
            </div>
            <div className="selectDiv">
                <span>search by:</span>
                <select id="searchSelect" placeholder='Track' onChange={() => onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)}>
                    <option>Track</option>
                    <option>Album</option>
                    <option>Artist</option>
                </select>
            </div>
        </div>
    );
}

export default SearchBar;