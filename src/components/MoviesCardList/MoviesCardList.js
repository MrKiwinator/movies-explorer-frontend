import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesExpandButton from '../MoviesExpandButton/MoviesExpandButton';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
    return(
        <section className="cards">
            <div className="cards__container">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <MoviesExpandButton />
        </section>
    )
}