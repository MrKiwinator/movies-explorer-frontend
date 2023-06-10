import React from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesExpandButton from '../MoviesExpandButton/MoviesExpandButton';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
    // ======= Hook to get current location =======
    const location = useLocation();

    return(
        <section className="cards">
            <ul className="cards__list">
                {
                    props.moviesList.map(movie => {

                        const isSaved = props.savedMovies.some(savedMovie => savedMovie.movieId === movie.id)

                        return(
                            <li
                                key={
                                    location.pathname === "/movies" ? movie.id : movie._id
                                }
                                className="cards__list-item"
                            >
                                <MoviesCard 
                                    movie={movie}
                                    savedMovies={props.savedMovies}
                                    onMovieSave={props.onMovieSave}
                                    onMovieDelete={props.onMovieDelete}
                                    isSaved={isSaved}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            {
                (props.showExpandBtn) &&
                    <MoviesExpandButton 
                        onClick={props.handleExpandBtnClick}
                    />
            }
        </section>
    )
}