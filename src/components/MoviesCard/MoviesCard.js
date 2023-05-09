import React from "react";
import { useLocation } from "react-router-dom";

import MoviesCardLikeBtn from '../MoviesCardLikeBtn/MoviesCardLikeBtn';
import MoviesCardDeleteBtn from "../MoviesCardDeleteBtn/MoviesCardDeleteBtn";

import './MoviesCard.css';
// delete after the tests:
import filmPosterSmall from '../../images/film-poster-test.png';
import filmPosterBig from '../../images/film-poster-test_big.png';

export default function MoviesCard(props) {

    const location = useLocation();

    return (
        <article className="card">
            <div className="card__info-container">
                <div className="card__info">
                    <h2 className="card__title">
                        Название фильма
                    </h2>
                    <p className="card__duration">
                        1ч 20м
                    </p>
                </div>
                {
                    location.pathname === '/movies' ? <MoviesCardLikeBtn /> : <MoviesCardDeleteBtn />
                }
            </div>
            <div className="card__img-container">
                <img 
                    className="card__img"
                    src={filmPosterSmall} 
                    // TODO: on next step change alt to flim title
                    alt="Постер к фильму"
                />
                <img 
                    className="card__img_big"
                    // TODO: on next step change alt to flim title
                    src={filmPosterBig} 
                    alt="Постер к фильму"
                />
            </div>
        </article>
    )
}