import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import moviesApi from '../../utils/moviesApi';

import './Movies.css';

export default function Movies(props) {
    const [movies, setMovies] = React.useState([]);

    // Hooks for external database:
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [movieToFind, setMovieToFind] = React.useState("");
    const [shortFilterIsActive, setShortFilterIsActive] = React.useState(false);

    // Hooks for site database:
    const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
    const [savedMovieToFind, setSavedMovieToFind] = React.useState("");
    const [savedShortFilterIsActive, setSavedShortFilterIsActive] = React.useState(false);

    const [infoMessage, setInfoMessage] = React.useState("");
    const [showPreloader, setShowPreloader] = React.useState(false);

    const location = useLocation();

    // Reset filters on path change
    React.useEffect(() => {
        if (location.pathname === "/saved-movies") {
            setMovieToFind("");
            setShortFilterIsActive(false);
            setMoviesToShow(moviesPerPage);
            setFilteredMovies([]);
        }
        // setMovieToFind("");
        // setShortFilterIsActive(false);
        // setMoviesToShow(moviesPerPage);
        // setFilteredMovies([]);
    }, [location])

    // Get movies on page loading
    React.useEffect(() => {
        setShowPreloader(true);

        moviesApi.getMovies()   
            .then((movies) => {
                setMovies(movies);
                setInfoMessage("Пришло время найти фильм!");
            })
            .catch((err) => {
                setInfoMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.");
                console.log(err);
            })
            .finally(() => {
                setShowPreloader(false);
            })
    }, [])

    // Search movie:
    // ===========================================
    function handleSearchInputChange(e) {
        setMovieToFind(e.target.value);
    }

    function searchMovie(movie) {
        if (shortFilterIsActive) {
            if (movie.duration <= 40) {
                return movie.nameRU.toLowerCase().includes(movieToFind.toLowerCase());
            }
        } else {
            return movie.nameRU.toLowerCase().includes(movieToFind.toLowerCase())
        }
    }

    function handleSearchBtnClick(e) {
        e.preventDefault();
        
        const filteredMoviesArr = movies.filter(movie => searchMovie(movie));

        console.log(filteredMoviesArr);

        if (filteredMoviesArr.length === 0) {
            setFilteredMovies([])
            setInfoMessage("Упс! Кажется, такого фильма нет в нашей коллекции...");
            return;
        }
        setFilteredMovies(filteredMoviesArr);

        setMoviesToShow(moviesPerPage);
    }

    function handleCheckboxChange() {
        setShortFilterIsActive(!shortFilterIsActive);
    }
    // ===========================================

    // Render movies and expand button:
    // ===========================================
    const moviesPerPage = 7;
    const [moviesToShow, setMoviesToShow] = React.useState(moviesPerPage);

    function getMoviesList() {
        return filteredMovies.slice(0, moviesToShow);
    }

    function handleExpandBtnClick() {
        setMoviesToShow(moviesToShow + 7);
    }
    // ===========================================

    return(
        <main className="movies">
            <SearchForm
                value={movieToFind}
                handleSearchInputChange={handleSearchInputChange}
                handleSubmitClick={handleSearchBtnClick}
                onChechboxChange={handleCheckboxChange}
                fiterIsActive={shortFilterIsActive}
            />
            {
                showPreloader ? 
                    <Preloader /> 
                    : 
                    filteredMovies.length === 0 ?
                        <MoviesInfoMessage 
                            message={infoMessage}
                        />
                        :
                        <MoviesCardList 
                            moviesList={getMoviesList}
                            handleClick={handleExpandBtnClick}
                            showExpandBtn={moviesToShow <= filteredMovies.length}
                        />
            }
        </main>
    )
}