import {useContext} from 'react';
import {searchContext} from './Songs';
import searchIcon from './../../assets/search1.svg';
function SearchBar(){
    const onSearchClick = useContext(searchContext);
    function handleFavoritesClick(event){
        event.target.classList.toggle('btnClicked');
        //now I need to add to a context the favorites btn state,
        //and display songs based on that.
    }
    return(
        <div class="searchBar">
            <div class="searchField">
                <img id="searchIcon" src={searchIcon} alt='search icon'></img>
                <input id="searchInput" onChange={() => onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)}>
                </input>
            </div>
            <div class="favoritesDiv">
                <button class="favoritesBtn" onClick={handleFavoritesClick}>Favorites</button>
            </div>
            <div class="selectDiv">
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