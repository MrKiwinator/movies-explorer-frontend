import React from "react";

import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import mainApi from "../../utils/mainApi";
import useStickyState from "../../utils/customHooks/useStickyState";

import "./MoviesSaved.css";

export default function MoviesSaved(props) {
    const [savedMovies, setSavedMovies] = useStickyState([], "savedMovies");

    const [filteredMovies, setFilteredMovies] = useStickyState([], "savedMoviesFiltered");

    const [moviesToFind, setMoviesToFind] = useStickyState("", "savedMoviesToFind");

    const [shortFilterIsActive, setShortFilterIsActive] = useStickyState(false, "savedMoviesShorFilterIsActive");

    const [showPreloader, setShowPreloader] = useStickyState(false, "savedMoviesShowPreloader");

    const [infoMessage, setInfoMessage] = useStickyState("", "savedMoviesInfoMessage");

    React.useEffect(() => {
        if (savedMovies.length === 0) {
            setShowPreloader(true);

            mainApi.getMovies()
                .then((res) => {
                    console.log(res);
                    setSavedMovies(res);
                    setInfoMessage("Настало время найти фильм!")
                })
                .catch((err) => {
                    console.log(err);
                    setInfoMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                })
                .finally(() => {
                    setShowPreloader(false);
                })
        }
    }, [savedMovies.length, setInfoMessage, setSavedMovies, setShowPreloader])

    function handleSearchInputChange(e) {
        setMoviesToFind(e.target.value);
    }

    function searchMovie(movie) {
        if (shortFilterIsActive) {
            if (movie.duration <= 40) {
                return movie.nameRU.toLowerCase().includes(moviesToFind.toLowerCase());
            }
        } else {
            return movie.nameRU.toLowerCase().includes(moviesToFind.toLowerCase());
        }
    }

    function handleSearchBtnClick(e) {
        e.preventDefault();

        const filteredMoviesArr = savedMovies.filter((movie) => {
            return searchMovie(movie)
        });

        if (filteredMoviesArr.length === 0) {
            setFilteredMovies([])
            setInfoMessage("Ничего не найдено");
            return;
        }
        setFilteredMovies(filteredMoviesArr)
    }

    function handleCheckboxChange() {
        setShortFilterIsActive(!shortFilterIsActive);
    }

    // Delete movie:
    const handleDeleteMovie = (movieId) => {
        mainApi.deleteMovie(movieId)
            .then((deletedMovie) => {
                setFilteredMovies(filteredMovies.filter(filteredMovie => filteredMovie._id !== deletedMovie._id && filteredMovie));
                setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== deletedMovie._id && savedMovie));
            })
    }
    
    return (
        <main className="movies">
            <SearchForm
                value={moviesToFind}
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
                            moviesList={filteredMovies}
                            savedMovies={savedMovies}
                            onMovieDelete={handleDeleteMovie}
                        />
            }

        </main>
    )
}