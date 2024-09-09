import React, { useState } from 'react';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <button className={`heart-button ${liked ? 'liked' : ''}`} onClick={toggleLike}>
        ❤
        </button>
    );
};

export default LikeButton;
