import React, { useContext, useState } from 'react';
import { stateContext } from '../Menu/Menu';
import { addLiked, removeLiked } from '../../dataCenter';

const LikeButton = (props) => {
    const { favBooks, userLogged } = useContext(stateContext);
    const { isLiked, _id } = props
    const [liked, setLiked] = useState(isLiked ? true:false);
    
    const toggleLike = async (event) => {
        event.stopPropagation();
        setLiked(!liked);
        try{
            if(liked)
                await addLiked(userLogged,'books', _id)
            else
                await removeLiked(userLogged,'books',_id);
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
