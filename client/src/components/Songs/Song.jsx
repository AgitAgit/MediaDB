const MAX_STRING_LENGTH = 20;

function Song(props){
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    return(
        <div class="Song">
            <img src={img} alt='failed to load image...' class="songImg"></img>
            <a href={trackLink}><h3>{track}</h3></a>
            <a href={albumLink}><h4>album:{album}</h4></a>
            <a href={artistLink}><h4>artist:{artist}</h4></a>
        </div>
    );
}

function Song2(props){
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    function trimText(str=""){
        if(str?.length > MAX_STRING_LENGTH){
            return str.substring(0, MAX_STRING_LENGTH) + "...";
        }
    }    
    return(
        <div class="Song2">
            <img src={img} alt='failed to load image...' class="songImg"></img>
            <a href={trackLink}><h3>{track}</h3></a>
            <a href={albumLink}><h4>album:{album}</h4></a>
            <a href={artistLink}><h4>artist:{artist}</h4></a>
        </div>
    );
}


export {Song, Song2}; 