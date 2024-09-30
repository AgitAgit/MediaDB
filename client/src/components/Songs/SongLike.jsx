import {useState, useContext, useEffect} from 'react';
import {stateContext} from '../Menu/Menu.jsx';
import { addLiked, removeLiked } from '../../dataCenter.js';

function SongLike(props){
    const [liked, setLiked] = useState(false);
    const _id = props._id;
    const {favSongs, setFavSongs, userLogged} = useContext(stateContext);

    useEffect(()=>{
        if(favSongs.includes(_id)){
            setLiked(true);
        }
    },[favSongs, _id]);

    function handleSongLikeClick(event){
        event.stopPropagation();
        if(!liked){
            setFavSongs(...favSongs, _id);
            addLiked(userLogged, 'songs', _id);
        }
        else{
            setFavSongs(favSongs.filter(song => song !== _id));
            removeLiked(userLogged, 'songs', _id);
        }
        setLiked(liked => !liked);
    }

    return(
        <button className="songLikeButton" onClick={handleSongLikeClick}>{liked ? '❤️':'🩶'}</button>
    );
}

export default SongLike;