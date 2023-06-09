import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import moviesApi from "../../utils/moviesApi";
import mainApi from "../../utils/mainApi";

import useStickyState from "../../utils/customHooks/useStickyState";
import { useWindowResize } from "../../utils/customHooks/useWindowResize";

import {
    MOBILE_WIDTH_BREAKPOINT,
    NUM_OF_MOVIES_ON_WIDE_SCREEN,
    NUM_OF_MOVIES_ON_NARROW_SCREEN,
    SHORT_MOVIE_DURATION,
} from "../../utils/constants";

import "./MoviesAll.css";

export default function MoviesAll(props) {
    
    // ======= Custom hook to get window size =======
    const { width } = useWindowResize();
    
    // ======= State hooks =======
    // =================================================
    const [movies, setMovies] = useStickyState([], "allMovies");
    const [savedMovies, setSavedMovies] = useStickyState([], "savedMovies")

    const [filteredMovies, setFilteredMovies] = useStickyState([], "allMoviesFiltered");

    const [moviesToFind, setMoviesToFind] = useStickyState("", "allMoviesToFind");
    const [lastMoviesSearch, setLastMoviesSearch] = useStickyState("", "allMoviesLastMoviesSearch");

    const [shortFilterIsActive, setShortFilterIsActive] = useStickyState(false, "allMoviesShorFilterIsActive");

    const [showPreloader, setShowPreloader] = useStickyState(false, "allMoviesShowPreloader");

    const [infoMessage, setInfoMessage] = useStickyState("Настало время найти фильм!", "allMoviesInfoMessage");

    const [errorMessage, setErrorMessage] = React.useState("");
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [numberOfMoviesPerPage, setNumberOfMoviesPerPage] = React.useState(null);
    const [numberOfMoviesToShow, setNumberOfMoviesToShow] = useStickyState(numberOfMoviesPerPage, "numberOfMoviesToShow");
    // =================================================

    

    // ======= Effect hooks =======
    // =================================================
    // Used to show an error if no text in search input:
    React.useEffect(() => {
        if (moviesToFind) {
            setShowErrorMessage(false);
        } else {
            setShowErrorMessage(true);
        }
    
    }, [moviesToFind])

    // Used to search movies when changing movieToFind (by clicking search btn).
    // So if you've found movies, delete some input simbols and reload the page
    // result won't show you changed movies result as per current input value,
    // (as like you've pressed search btn), but show you last confirmed results.
    React.useEffect(() => {
        handleMoviesSearch(movies, lastMoviesSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Used to setup qtty of movies to show on more btn click:
    React.useEffect(() => {
        if (width >= MOBILE_WIDTH_BREAKPOINT) {
            setNumberOfMoviesPerPage(NUM_OF_MOVIES_ON_WIDE_SCREEN);
        } else {
            setNumberOfMoviesPerPage(NUM_OF_MOVIES_ON_NARROW_SCREEN);
        }
    }, [width])

    React.useEffect(() => {
        handleMoviesSearch(movies, lastMoviesSearch);

        if (lastMoviesSearch === "") {
            setFilteredMovies([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shortFilterIsActive])
    // =================================================


    // ALL MOVIES
    // =================================================
    // Save movie:
    function handleSaveMovie(movie) {
        mainApi.saveMovie(movie)
            .then((savedMovie) => {
                setSavedMovies(prevValue => {
                    return [savedMovie.movie, ...prevValue]
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

    function getInitialMoviesSearch() {
        setShowPreloader(true);
        
        // If saved movies were get of /saved-movies page
        // request only all movies from external server:
        if (savedMovies.length !== 0) {
            moviesApi.getMovies()
                .then((allMovies) => {
                    setMovies(allMovies);
                    handleMoviesSearch(allMovies, moviesToFind);
                })
                .catch((err) => {
                    console.log(err);
                    setInfoMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                })
                .finally(() => {
                    setShowPreloader(false);
                })
        } else {
            // To search movies and to get info about saved movies (to show which movies are saved)
            // making req to both db
            Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
            .then(([allMovies, savedMovies]) => {
                setMovies(allMovies);
                setSavedMovies(savedMovies);
                handleMoviesSearch(allMovies, moviesToFind);
            })
            .catch((err) => {
                console.log(err);
                setInfoMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
            })
            .finally(() => {
                setShowPreloader(false);
            })
        }
    }

    function handleSearchInputChange(e) {
        setMoviesToFind(e.target.value);
    }

    function searchMovie(movie, searchString) {
        if (shortFilterIsActive) {
            if(movie.duration <= SHORT_MOVIE_DURATION) {
                return movie.nameRU.toLowerCase().includes(searchString.toLowerCase());
            }
        } else {
            return movie.nameRU.toLowerCase().includes(searchString.toLowerCase());
        }
    }

    function handleMoviesSearch(movies, searchString) {
        const filteredMoviesArr = movies.filter((movie) => {
            return searchMovie(movie, searchString);
        });

        if (filteredMoviesArr.length === 0) {
            setFilteredMovies([])
            setInfoMessage("Ничего не найдено");
            return;
        }
        setFilteredMovies(filteredMoviesArr)
    }

    function handleSearchBtnClick(e) {
        e.preventDefault();

        if (moviesToFind === "") {
            setShowErrorMessage(true);
            setErrorMessage("Нужно ввести ключевое слово");
            return;
        }

        // If there is no movies sending request to external db:
        if (movies.length === 0) {
            getInitialMoviesSearch();
        } else {
            handleMoviesSearch(movies, moviesToFind);
        }

        setLastMoviesSearch(moviesToFind);
        setNumberOfMoviesToShow(numberOfMoviesPerPage);
    }

    function handleCheckboxChange() {
        setShortFilterIsActive(!shortFilterIsActive);
    }

    function handleExpandBtnClick() {
        setNumberOfMoviesToShow(numberOfMoviesToShow + numberOfMoviesPerPage);
    }
    // =================================================


    
    return (
        <>
            <Header
                loggedIn={props.loggedIn}
            />
            <main className="movies">
                <SearchForm
                    value={moviesToFind}
                    handleChange={handleSearchInputChange}
                    handleSubmitClick={handleSearchBtnClick}
                    onChechboxChange={handleCheckboxChange}
                    fiterIsActive={shortFilterIsActive}
                    errorMessage={showErrorMessage && errorMessage}
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
                                    filteredMovies.slice(0, numberOfMoviesToShow)
                                }
                                showExpandBtn={numberOfMoviesToShow < filteredMovies.length}
                                handleExpandBtnClick={handleExpandBtnClick}
                                onMovieSave={handleSaveMovie}
                                onMovieDelete={handleDeleteMovie}
                            />
                }

            </main>
            <Footer />
        </>
        
    )
}