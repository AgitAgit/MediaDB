import React, { useContext, useState, useEffect } from 'react';
import { stateContext } from '../Menu/Menu';
import { addLiked, removeLiked } from '../../dataCenter';
import { currBook } from './Books';

const LikeButton = (props) => {
    const { favBooks, setFavBooks, userLogged } = useContext(stateContext);
    const { favorites } = useContext(currBook);
    const { _id } = props
    const [liked, setLiked] = useState(false); // Set initial state to false

    useEffect(() => {
        if (favBooks.includes(_id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [_id]);
    
    const toggleLike = async (event) => {
        event.stopPropagation();
        try{
            if(!liked){
                await addLiked(userLogged,'books', _id)
                setFavBooks(prev => [...prev, _id]);
            }
            else {
                await removeLiked(userLogged,'books',_id);
                setFavBooks(prev => prev.filter(id => id !== _id));
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
