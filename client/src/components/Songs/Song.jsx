
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

export default Song;