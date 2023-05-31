import React from 'react';

import './MoviesCardLikeBtn.css';

export default function MoviesCardLikeBtn(props) {
    return (
        <button 
            type="button" 
            aria-label="Нравится" 
            onClick={props.handleLikeClick}
            className={
                `card__like ${props.isActive && 'card__like_active'}`
            }
        />
    )
}