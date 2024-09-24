import LikeButton from "./LikeButton";

const MAX_TRACK_LENGTH = 40;
const MAX_STRING_LENGTH = 20;

function Song(props){
    const {_id, img, track, album, artist, trackLink, albumLink, artistLink} = props.data;

    const onSongClick = props.onSongClick;

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
    
    return(
        <div class="Song" onClick={() => onSongClick(props.data)}>
            <img src={img} alt='failed to load image...' class="songImg"></img>
            <h3>{trimText(track,'track')}</h3>
            <p>album:{trimText(album)}</p>
            <br/>
            <p>artist:{trimText(artist)}</p>
            {/* <br/> */}
            <LikeButton _id={_id}/>
        </div>
    );
}


export default Song; 