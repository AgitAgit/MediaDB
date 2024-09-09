
function Song(props){
    const {img, track, album, artist, link, albumLink, artistLink} = props.data;
    return(
        <div class="Song">
            <img src={img} alt={img}></img>
            <a href={link}><h1>{track}</h1></a>
            <a href={albumLink}><h3>album:{album}</h3></a>
            <a href={artistLink}><h3>artist:{artist}</h3></a>
        </div>
    );
}

export default Song;