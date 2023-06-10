import React from 'react';

import './MoviesCardSaveBtn.css';

export default function MoviesCardSaveBtn(props) {
    // SAVE MOVIE BTTN
    // =================================================
    function handleClick() {
        props.onMovieSaveBtnClick(props.movie);
    }
    // =================================================


    
    return (
        <button 
            type="button" 
            aria-label="Нравится" 
            onClick={handleClick}
            className={
                `card__like ${props.isSaved && 'card__like_active'}`
            }
        />
    )
}