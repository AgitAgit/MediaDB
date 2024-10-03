import { useContext, useState, useEffect, useRef } from 'react';
import {searchContext} from './Songs';
import searchIcon from './../../assets/search1.svg';
// import { stateContext } from '../Menu/Menu';
function SearchBar(){
    const { onSearchClick } = useContext(searchContext);
    const [favBtnOn, setFavBtnOn] = useState(false);
    const artists = [
        "AC/DC",
        "Adele",
        "Aerosmith",
        "Ariana Grande",
        "Aretha Franklin",
        "Bad Bunny",
        "Beyoncé",
        "Billie Eilish",
        "The Black Eyed Peas",
        "Bob Dylan",
        "Bruce Springsteen",
        "Bruno Mars",
        "BTS",
        "The Chainsmokers",
        "Coldplay",
        "David Bowie",
        "Doja Cat",
        "Drake",
        "Dua Lipa",
        "Ed Sheeran",
        "Elton John",
        "Eminem",
        "Elvis Presley",
        "George Harrison",
        "Guns N' Roses",
        "Harry Styles",
        "Imagine Dragons",
        "Jennifer Lopez",
        "John Lennon",
        "Justin Bieber",
        "Kanye West",
        "Lady Gaga",
        "Led Zeppelin",
        "Maroon 5",
        "Michael Jackson",
        "Metallica",
        "Olivia Rodrigo",
        "Paul McCartney",
        "Pink",
        "Pink Floyd",
        "Post Malone",
        "Prince",
        "Queen",
        "Rihanna",
        "Ringo Starr",
        "Rolling Stones, The",
        "Shakira",
        "Taylor Swift",
        "The Beatles",
        "The Weeknd",
        "Whitney Houston"
      ];
    const artistSelectRef = useRef(null);
    const artistSelectDivRef = useRef(null);

    function handleFavoritesClick(event){
        const fav = !favBtnOn;
        event.target.classList.toggle('btnClicked');
        setFavBtnOn(value => !value);
        onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value, fav);
        
    }

    function handleSelectChange(event){
        if(event.target.value === 'Artist'){
            artistSelectDivRef.current.classList.remove('hidden');
        }
        else{
            artistSelectDivRef.current.classList.add('hidden');
        }
    }

    function initArtistSelect(){
        while(artistSelectRef.current.firstChild){
            artistSelectRef.current.removeChild(artistSelectRef.current.firstChild);
        }
        for(let i = 0; i < artists.length; i++){
            const option = document.createElement('option');
            option.textContent = artists[i];
            artistSelectRef.current.appendChild(option);
        }
    }

    useEffect(() => {
        initArtistSelect();
    });

    return(
        <div className="searchBar">
            <div className="searchField">
                <img id="searchIcon" src={searchIcon} alt='search icon'></img>
                <input id="searchInput" onChange={() => onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)}>
                </input>
            </div>
            <div ref={artistSelectDivRef} className="artistSelectDiv hidden">
                <span>Artists in db:</span>
                <select ref={artistSelectRef} class="artistSelect" defaultValue='Artist' onChange={() => onSearchClick(artistSelectRef.current.value, document.getElementById('searchSelect').value)}>
                </select>
            </div>
            <div className="favoritesDiv">
                <button className="favoritesBtn" onClick={handleFavoritesClick}>Favorites</button>
            </div>
            <div className="selectDiv">
                <span>search by:</span>
                <select id="searchSelect" placeholder='Track' onChange={(event) => {
                    onSearchClick(document.getElementById('searchInput').value, document.getElementById('searchSelect').value)
                    handleSelectChange(event);
                    }}>
                    <option>Track</option>
                    <option>Album</option>
                    <option>Artist</option>
                </select>
            </div>
        </div>
    );
}

export default SearchBar;