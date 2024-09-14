function SearchBar({onSearchClick}){
    return(
        <div>
            <input id="searchInput"></input>
            <button onClick={() => onSearchClick(document.getElementById('searchInput').value )}>search</button>
            <select>
                <option>option 1</option>
                <option>option 3000</option>
            </select>
        </div>
    );
}

export default SearchBar;