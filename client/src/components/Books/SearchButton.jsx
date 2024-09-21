import search_icon_black from './../../assets/search_icon-black.png';
import search_icon_white from './../../assets/‏‏search_icon-white.png'
import { stateContext } from '../Menu/Menu';
import { useContext } from 'react';

function SearchButton(props){
    const { searchText, setSearchText, setTriggerSearch} = props;
    const { theme } = useContext(stateContext);

    function handleTextChange(event){
        setSearchText(event.target.value);
    }
    function handleSearchClick(){
        setTriggerSearch((prev) => !prev);
    }

    return(
    <div id='search-container'>
        <input type='text' id='search-input-bar' value={searchText} onChange={handleTextChange} placeholder='Search for a book...' />
        <img id='search-icon' onClick={handleSearchClick} src={theme === 'light' ? search_icon_black : search_icon_white} />
    </div>
    );
}

export default SearchButton;