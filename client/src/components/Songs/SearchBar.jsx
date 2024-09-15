import {useContext} from 'react';
import {searchContext} from './Songs';
import searchIcon from './../../assets/search1.svg'
function SearchBar(){
    const onSearchClick = useContext(searchContext);

    return(
        <div class="searchBar">
            <div class="searchField">
                <img id="searchIcon" src={searchIcon} alt='search icon'></img>
                <input id="searchInput" onChange={() => onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)}></input>
            </div>
            <span>Search by:</span>
            <select id="searchSelect" placeholder='Track'>
                <option>Track</option>
                <option>Album</option>
                <option>Artist</option>
            </select>
        </div>
    );
}

export default SearchBar;