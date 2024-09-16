const MAX_TRACK_LENGTH = 50;
const MAX_STRING_LENGTH = 30;

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
    function trimText(str,type){
        if(type === 'track' && str?.length > MAX_TRACK_LENGTH){
            return str.substring(0, MAX_TRACK_LENGTH) + "...";
        }
        else if(type !== 'track' && str?.length > MAX_STRING_LENGTH){
            return str.substring(0, MAX_STRING_LENGTH) + "...";
        }
        else{
            return str;
        }
    }
    function onLikeClick(){
        
    }

    return(
        <div class="Song">
            <img src={img} alt='failed to load image...' class="songImg"></img>
            <a href={trackLink}><h3>{trimText(track,'track')}</h3></a>
            <a href={albumLink}><h4>album:{trimText(album)}</h4></a>
            <a href={artistLink}><h4>artist:{trimText(artist)}</h4></a>
            <button class="likeButton" onclick={onLikeClick}></button>
        </div>
    );
}


export {Song, Song2}; 