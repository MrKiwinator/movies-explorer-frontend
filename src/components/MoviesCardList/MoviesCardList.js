import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesExpandButton from '../MoviesExpandButton/MoviesExpandButton';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
    return(
        <section className="cards">
            <ul className="cards__list">
                {
                    props.moviesList().map(movie => {
                        return(
                            <li
                                key={movie.id}
                                className="cards__list-item"
                            >
                                <MoviesCard movie={movie} />
                            </li>
                        )
                    })
                }
            </ul>
            {
                (props.showExpandBtn) &&
                    <MoviesExpandButton 
                        onClick={props.handleClick}
                    />
            }
            
        </section>
    )
}