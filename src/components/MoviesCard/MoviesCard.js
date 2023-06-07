import React from "react";
import { useLocation } from "react-router-dom";

import MoviesCardSaveBtn from '../MoviesCardSaveBtn/MoviesCardSaveBtn';
import MoviesCardDeleteBtn from "../MoviesCardDeleteBtn/MoviesCardDeleteBtn";

import './MoviesCard.css';

export default function MoviesCard(props) {

    // ======= Hook to get current location =======
    const location = useLocation();



    // MOVIE CARD
    // =================================================
    function getDuration() {
        const movieDuration = props.movie.duration

        if (movieDuration > 60) {
            return(`${Math.trunc(movieDuration / 60)}ч ${movieDuration % 60}м`);
        }

        return (`${movieDuration}м`)   
    }

    function handleMovieSaveBtnClick() {
        if (props.isSaved) {
            handleMovieDeleteBtnClick();
        } else {
            props.onMovieSave(props.movie)
        }
    }

    function handleMovieDeleteBtnClick() {
        const movieToDelete = props.savedMovies.find((savedMovie) => {
            return savedMovie.movieId === (location.pathname === "/movies" ? props.movie.id : props.movie.movieId)
        })
        return props.onMovieDelete(movieToDelete._id)
    }
    // =================================================


    
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
                    <MoviesCardSaveBtn
                        isSaved={props.isSaved}
                        onMovieSaveBtnClick={handleMovieSaveBtnClick}
                        movie={props.movie}
                    /> 
                    : 
                    <MoviesCardDeleteBtn 
                        onMovieDelete={handleMovieDeleteBtnClick} 
                        movie={props.movie}
                    />
                }
            </div>
            <div className="card__img-container">
                <img 
                    className="card__img"
                    src={
                        location.pathname === "/movies" ? `https://api.nomoreparties.co/${props.movie.image.url}` :
                        location.pathname === "/saved-movies" && props.movie.image
                    }
                    // TODO: on next step change alt to flim title
                    alt={props.movie.image.name}
                />
                <img 
                    className="card__img card__img_big"
                    src={
                        location.pathname === "/movies" ? `https://api.nomoreparties.co/${props.movie.image.url}` :
                        location.pathname === "/saved-movies" && props.movie.image
                    }
                    // TODO: on next step change alt to flim title
                    alt={props.movie.image.name}
                />
            </div>
        </article>
    )
}