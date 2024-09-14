import SearchBar from './SearchBar';

function Header({onSearchClick}){
    return(
        <header class="songsHeader">
            <h1>this is the header</h1>
            <SearchBar onSearchClick={onSearchClick} />
            <hr/>
        </header>
    );
}

export default Header;