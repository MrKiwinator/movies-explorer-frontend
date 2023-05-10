import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesExpandButton from '../MoviesExpandButton/MoviesExpandButton';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
    return(
        <section className="cards">
            <ul className="cards__list">
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
                <li className="cards__list-item">
                    <MoviesCard />
                </li>
            </ul>
            <MoviesExpandButton />
        </section>
    )
}