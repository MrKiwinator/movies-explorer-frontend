import React from 'react';

import './MoviesCardLikeBtn.css';

export default function MoviesCardLikeBtn(props) {
    const [isActive, setIsActive] = React.useState(false);

    function handleLikeClick() {
        setIsActive(!isActive);
    }

    return (
        <button 
            type="button" 
            aria-label="Нравится" 
            onClick={handleLikeClick}
            className={
                `card__like ${isActive && 'card__like_active'}`
            }
        />
    )
}