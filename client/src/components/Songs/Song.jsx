import defaultImg from "C:/Users/User/Learning/Software/projects/MediaDB/client/src/assets/DefaultAlbumCover.png";

function Song({img=defaultImg, title='def title', album='def album', artist='def artist', songLink, albumLink, artistLink}){
    return(
        <div id="Song">
            <img src={img} alt={img}></img>
            <a href={songLink}><h1>{title}</h1></a>
            <a href={albumLink}><h3>album:{album}</h3></a>
            <a href={artistLink}><h3>artist:{artist}</h3></a>
        </div>
    );
}

export default Song;