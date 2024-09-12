import search_icon_black from './../../assets/search_icon-black.png';
import search_icon_white from './../../assets/‏‏search_icon-white.png'

function SearchButton(props){
    const { searchText, setSearchText, theme } = props;

    function handleTextChange(event){
        setSearchText(event.target.value);
    }

    return(
    <div id='search-container'>
        <input type='text' value={searchText} onChange={handleTextChange} placeholder='Search for a book...' />
        <img id='search-icon' src={theme === 'light' ? search_icon_black : search_icon_white} />
    </div>
    );
}

export default SearchButton;