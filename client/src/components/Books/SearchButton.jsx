import search_icon from './../../assets/search_icon.png';

function SearchButton(props){
    const { searchText, setSearchText } = props;

    function handleTextChange(event){
        setSearchText(event.target.value);
    }

    return(
    <div id='search-container'>
        <input type='text' onChange={handleTextChange} placeholder='Search for a book...' />
        <img id='search-icon' src={search_icon} />
    </div>
    );
}

export default SearchButton;