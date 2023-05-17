import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies(props) {
    return(
        <main className="movies">
            <SearchForm />
            <MoviesCardList />
        </main>
    )
}