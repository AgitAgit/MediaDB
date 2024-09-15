import SearchBar from './SearchBar';

function Header(){
    return(
        <header class="songsHeader">
            <div class="headerL1">
                <h1>LOGO</h1>
            </div>
            <div class="headerL2">
                <SearchBar/>
            </div>
            <div class="headerL3">
            </div>
        </header>
    );
}

export default Header;