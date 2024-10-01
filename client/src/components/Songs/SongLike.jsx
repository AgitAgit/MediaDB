import {useState, useContext, useEffect} from 'react';
import {stateContext} from '../Menu/Menu.jsx';
import { addLiked, removeLiked } from '../../dataCenter.js';

function SongLike(props){
    const [liked, setLiked] = useState(false);
    // const [_id, setId] = useState(props._id);
    const { _id } = props
    const {favSongs, setFavSongs, userLogged} = useContext(stateContext);

    useEffect(()=>{
        console.log("SongLike useEffect from: ",_id, "liked:",liked);
        console.log("favSongs:",favSongs);
        if(favSongs.includes(_id)){
            setLiked(true);
        }
    },[favSongs, _id]);

    function handleSongLikeClick(event){//being tested, needs some refactor...
        event.stopPropagation();
        if(!liked){
            setFavSongs([...favSongs, _id]);
            addLiked(userLogged, 'songs', _id);
        }
        else /*if(favSongs.length > 0)*/{
            setFavSongs(favSongs.filter(element => element !== _id));
            removeLiked(userLogged, 'songs', _id);
        }
        setLiked(liked => !liked);
    }

    return(
        <button className="songLikeButton" onClick={handleSongLikeClick}>
            {liked ? '❤️':'🩶'}
        </button>
    );
}

export default SongLike;