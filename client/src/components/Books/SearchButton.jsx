import search_icon from './../../assets/search_icon.png';

function SearchButton(){

    return(
    <div id='search-container'>
        <input type='text' placeholder='Search for a book...' />
        <img id='search-icon' src={search_icon} />
    </div>
    );
}

export default SearchButton;