function Song({img, title='def title', album='def album', artist='def artist', songLink, albumLink, artistLink}){
    return(
        <div id="Song">
            <img src={img} alt={title}></img>
            <a href={songLink}><h1>{title}</h1></a>
            <a href={albumLink}><h3>album:{album}</h3></a>
            <a href={artistLink}><h3>artist:{artist}</h3></a>
        </div>
    );
}

export default Song;