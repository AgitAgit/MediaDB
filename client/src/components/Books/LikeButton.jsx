import React, { useContext, useState, useEffect } from 'react';
import { stateContext } from '../Menu/Menu';
import { addLiked, removeLiked } from '../../dataCenter';
import { currBook } from './Books';


const LikeButton = (props) => {
    const { favBooks, setFavBooks, userLogged } = useContext(stateContext);
    const { favorites, setIsLoginPopupVisible, setTriggerSearch } = useContext(currBook);
    const { _id, bigCard } = props
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (favBooks.includes(_id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [_id, favBooks]);
    
    const toggleLike = (event) => {
        event.stopPropagation();
        if(userLogged === "guest")
            setIsLoginPopupVisible(true);
        else {
            try{
                if(!liked){
                    addLiked(userLogged,'books', _id)
                    setFavBooks(prev => [...prev, _id]);
                }
                else {
                    removeLiked(userLogged,'books',_id);
                    setFavBooks(prev => prev.filter(id => id !== _id));
                }
            setLiked(!liked);
            if(favorites) setTriggerSearch(prev => !prev);
            }
            catch (err) {
                console.error("Error adding liked item:", err);
            }
        }
    };


    return (
            <button className={`heart-button ${bigCard ? "big-card-like": ""}`} onClick={toggleLike}>
            {liked ? '❤️':'🤍'}
            </button>
    );
};

export default LikeButton;
