import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import mainApi from "../../utils/mainApi";

import useStickyState from "../../utils/customHooks/useStickyState";

import "./MoviesSaved.css";

export default function MoviesSaved(props) {

    // ======= State hooks =======
    // =================================================
    const [savedMovies, setSavedMovies] = useStickyState([], "savedMovies");

    const [filteredMovies, setFilteredMovies] = React.useState([]);

    const [moviesToFind, setMoviesToFind] = React.useState("");

    const [shortFilterIsActive, setShortFilterIsActive] = React.useState(false);

    const [showPreloader, setShowPreloader] = React.useState(false);

    const [infoMessage, setInfoMessage] = React.useState("");

    const [errorMessage, setErrorMessage] = React.useState("");
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    // =================================================


    // ======= Effect hooks =======
    // =================================================
    // Used to show an error if no text in search input:
    React.useEffect(() => {
        if (moviesToFind !== "") {
            setShowErrorMessage(false);
        } else {
            setShowErrorMessage(true);
        }
    }, [moviesToFind])
    // =================================================

    React.useEffect(() => {
        if (savedMovies.length === 0) {
            getInitialMoviesSearch();
        }
        handleMoviesSearch(savedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedMovies, shortFilterIsActive])

    // SAVED MOVIES
    // =================================================
    // Delete movie:
    const handleDeleteMovie = (movieId) => {
        mainApi.deleteMovie(movieId)
            .then((deletedMovie) => {
                setFilteredMovies(filteredMovies.filter(filteredMovie => filteredMovie._id !== deletedMovie._id && filteredMovie));
                setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== deletedMovie._id && savedMovie));
            })
    }

    function getInitialMoviesSearch() {
            setShowPreloader(true);

            mainApi.getMovies()
                .then((savedMovies) => {
                    setSavedMovies(savedMovies);
                    handleMoviesSearch(savedMovies);
                })
                .catch((err) => {
                    console.log(err);
                    setInfoMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                })
                .finally(() => {
                    setShowPreloader(false);
                })
    }
    
    function handleSearchInputChange(e) {
        setMoviesToFind(e.target.value);
    }

    function searchMovie(movie) {
        if (shortFilterIsActive) {
            if(movie.duration <= 40) {
                return movie.nameRU.toLowerCase().includes(moviesToFind.toLowerCase());
            }
        } else {
            return movie.nameRU.toLowerCase().includes(moviesToFind.toLowerCase());
        }
    }

    function handleMoviesSearch(movies) {
        const filteredMoviesArr = movies.filter((movie) => {
            return searchMovie(movie);
        })

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

        if (savedMovies.length === 0) {
            getInitialMoviesSearch();
        } else {
            handleMoviesSearch(savedMovies);
        }
    }

    function handleCheckboxChange() {
        setShortFilterIsActive(!shortFilterIsActive);
    }
    // =================================================
    


    return (
        <>
            <Header />
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
                                moviesList={filteredMovies.reverse()}
                                savedMovies={savedMovies}
                                onMovieDelete={handleDeleteMovie}
                            />
                }

            </main>
            <Footer />
        </>
        
    )
}