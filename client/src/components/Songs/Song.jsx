// import SongLike from "./SongLike.jsx";
import {useState, useContext, useEffect} from 'react';
import {stateContext} from '../Menu/Menu.jsx';
import { addLiked, removeLiked } from '../../dataCenter.js';

const MAX_TRACK_LENGTH = 40;
const MAX_STRING_LENGTH = 20;

function Song(props){
    const { _id,img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    const [liked, setLiked] = useState(false);
    const {favSongs, setFavSongs, userLogged} = useContext(stateContext);
    const onSongClick = props.onSongClick;

    useEffect(()=>{
        if(favSongs.includes(_id)){
            setLiked(true);
        }
        else{
            setLiked(false);
        }
        // console.log("SongLike useEffect from: ",_id, "liked:",liked);
        // console.log("favSongs:",favSongs);
    },[_id]);

    function handleSongLikeClick(event){
        event.stopPropagation();
        if(!liked){
            setFavSongs([...favSongs, _id]);
            addLiked(userLogged, 'songs', _id);
        }
        else{
            setFavSongs(favSongs.filter(element => element !== _id));
            removeLiked(userLogged, 'songs', _id);
        }
        setLiked(liked => !liked);
    }

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
        <div className="Song" onClick={() => onSongClick(props.data)}>
            <img src={img} alt='failed to load image...' className="songImg"></img>
            <h3>{trimText(track,'track')}</h3>
            <p>Album:{trimText(album)}</p>
            <br/>
            <p>Artist:{trimText(artist)}</p>
            {/* <br/> */}
            {/* <SongLike _id={_id}/> */}
            <button className="songLikeButton" onClick={handleSongLikeClick}>
                {liked ? '❤️':'🤍'}
            </button>
        </div>
    );
}


export default Song; 