import React from "react";
import { useLocation } from "react-router-dom";

import MoviesCardLikeBtn from '../MoviesCardLikeBtn/MoviesCardLikeBtn';
import MoviesCardDeleteBtn from "../MoviesCardDeleteBtn/MoviesCardDeleteBtn";

import mainApi from "../../utils/mainApi";

import './MoviesCard.css';

export default function MoviesCard(props) {

    const location = useLocation();

    function getDuration() {
        const movieDuration = props.movie.duration

        if (movieDuration > 60) {
            return(`${Math.trunc(movieDuration / 60)}ч ${movieDuration % 60}м`);
        }

        return (`${movieDuration}м`)   
    }

    const [likeIsActive, setLikeIsActive] = React.useState(false);

    function handleLikeClick() {
        mainApi.saveMovie(props.movie)
            .then(() => {
                setLikeIsActive(true);
            })
    }

    return (
        <article className="card">
            <div className="card__info-container">
                <div className="card__info">
                    <h2 className="card__title">
                        {props.movie.nameRU}
                    </h2>
                    <p className="card__duration">
                        {getDuration()}
                    </p>
                </div>
                {
                    location.pathname === '/movies' ? 
                    <MoviesCardLikeBtn
                        isActive={likeIsActive}
                        handleLikeClick={handleLikeClick}
                    /> : 
                    <MoviesCardDeleteBtn />
                }
            </div>
            <div className="card__img-container">
                <img 
                    className="card__img"
                    src={`https://api.nomoreparties.co/${props.movie.image.url}`}
                    // TODO: on next step change alt to flim title
                    alt={props.movie.image.name}
                />
                <img 
                    className="card__img card__img_big"
                    src={`https://api.nomoreparties.co/${props.movie.image.url}`}
                    // TODO: on next step change alt to flim title
                    alt={props.movie.image.name}
                />
            </div>
        </article>
    )
}