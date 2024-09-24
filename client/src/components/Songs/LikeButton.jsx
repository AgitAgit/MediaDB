import React, { useContext, useState, useEffect } from 'react';
import { stateContext } from '../Menu/Menu';
import { addLiked, removeLiked } from '../../dataCenter';

const LikeButton = (props) => {
    const { favSongs, setFavSongs, userLogged } = useContext(stateContext);
    const _id = props._id;
    const [liked, setLiked] = useState(false); // Set initial state to false

    useEffect(() => {
        if (favSongs.includes(_id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, []);
    
    const toggleLike = async (event) => {
        event.stopPropagation();
        try{
            if(!liked){
                await addLiked(userLogged,'songs', _id)
                setFavSongs(prev => [...prev, _id]);
            }
            else {
                await removeLiked(userLogged,'songs',_id);
                setFavSongs(prev => prev.filter(id => id !== _id));
            }
        setLiked(!liked);
        }
        catch (err) {
            console.error("Error adding liked item:", err);
        }
    };

    return (
        <button className={`heart-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
        ❤
        </button>
    );
};

export default LikeButton;
