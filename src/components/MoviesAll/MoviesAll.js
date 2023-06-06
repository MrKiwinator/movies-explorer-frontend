import React from "react";

import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import moviesApi from "../../utils/moviesApi";
import mainApi from "../../utils/mainApi";
import useStickyState from "../../utils/customHooks/useStickyState";

import "./MoviesAll.css";

export default function MoviesAll(props) {
    
    const [movies, setMovies] = useStickyState([], "allMovies");
    const [savedMovies, setSavedMovies] = useStickyState([], "savedMovies")

    const [filteredMovies, setFilteredMovies] = useStickyState([], "allMoviesFiltered");

    const [moviesToFind, setMoviesToFind] = useStickyState("", "allMoviesToFind");

    const [shortFilterIsActive, setShortFilterIsActive] = useStickyState(false, "allMoviesShorFilterIsActive");

    const [showPreloader, setShowPreloader] = useStickyState(false, "allMoviesShowPreloader");

    const [infoMessage, setInfoMessage] = useStickyState("", "allMoviesInfoMessage");

    const moviesPerPage = 7;
    const [moviesToShow, setMoviesToShow] = useStickyState(moviesPerPage, "allMoviesToShow");

    // Get list of all movies:
    React.useEffect(() => {
        if (movies.length === 0) {
            setShowPreloader(true);

            moviesApi.getMovies()
                .then((res) => {
                    setMovies(res);
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
        
    }, [movies, setInfoMessage, setMovies, setShowPreloader])

    // Get list of saved movies (to set likes and handle movie save):
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

        const filteredMoviesArr = movies.filter((movie) => {
            return searchMovie(movie)
        });

        if (filteredMoviesArr.length === 0) {
            setFilteredMovies([])
            setInfoMessage("Ничего не найдено");
            return;
        }
        setFilteredMovies(filteredMoviesArr)

        setMoviesToShow(moviesPerPage);
    }

    function handleCheckboxChange() {
        setShortFilterIsActive(!shortFilterIsActive);
    }

    function handleExpandBtnClick() {
        setMoviesToShow(moviesToShow + 7);
    }

    // Save movie:
    function handleSaveMovie(movie) {
        mainApi.saveMovie(movie)
            .then((savedMovie) => {
                setSavedMovies(prevValue => {
                    return [...prevValue, savedMovie.movie]
                })
            })
    }

    // Delete movie:
    function handleDeleteMovie(movieId) {
        mainApi.deleteMovie(movieId)
            .then(() => {
                setSavedMovies(prevValue => {
                    return prevValue.filter((movie) => {
                        return movie._id !== movieId;
                    });
                })
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
                            allMovies={movies}
                            savedMovies={savedMovies}
                            moviesList={
                                filteredMovies.slice(0, moviesToShow)
                            }
                            showExpandBtn={moviesToShow <= filteredMovies.length}
                            handleExpandBtnClick={handleExpandBtnClick}
                            onMovieSave={handleSaveMovie}
                            onMovieDelete={handleDeleteMovie}
                        />
            }

        </main>
    )
}