import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import MoviesInfoMessage from '../MoviesInfoMessage/MoviesInfoMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import moviesApi from '../../utils/moviesApi';
import mainApi from '../../utils/mainApi'

import './Movies.css';

export default function Movies(props) {
    // Global filter is in response on choosing which obj property to use "all" or "saved":
    const [globalMoviesFilter, setGlobalMoviesFilter] = React.useState("all");

    // TODO: try to rename to "moviesList" mb
    const [movies, setMovies] = React.useState({
        all: [],
        saved: [],
    });
    const [filteredMovies, setFilteredMovies] = React.useState({
        all: [],
        saved: [],
    });
    const [movieToFind, setMovieToFind] = React.useState({
        all: "",
        saved: "",
    });
    const [shortFilterIsActive, setShortFilterIsActive] = React.useState({
        all: false,
        saved: false,
    });

    const [infoMessage, setInfoMessage] = React.useState({
        all: "",
        saved: "",
    });
    const [showPreloader, setShowPreloader] = React.useState({
        all: true,
        saved: true,
    });

    const location = useLocation();

    // Change global filter on path change
    React.useEffect(() => {
        if (location.pathname === "/movies") {
            setGlobalMoviesFilter("all");
        } else if (location.pathname === "/saved-movies") {
            setGlobalMoviesFilter("saved");
        }
    }, [location])

    React.useEffect(() => {
        // Set movies.all if its exist in local storage:
        if (localStorage.movies & localStorage.movies !== []) {
            console.log("Getting movies from local storage")
            return setMovies(prevState => {
                return {...prevState, all: JSON.parse(localStorage.getItem("movies"))}
            });
        }

        // Get movies from extenal db on first page loading:
        moviesApi.getMovies()   
            .then((res) => {
                console.log("Getting movies from external db");
                setMovies(prevState => {
                    return {...prevState, all: res};
                })
                setInfoMessage(prevState => {
                    return {...prevState, all: "Пришло время найти фильм!"}
                })
                // Saving movies.all in local storage:
                localStorage.setItem('allMovies', JSON.stringify(movies));
            })
            .catch((err) => {
                setInfoMessage(prevState => {
                    return {...prevState, all: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."}
                });
                console.log(err);
            })
            .finally(() => {
                setShowPreloader(prevState => {
                    return {...prevState, all: false}
                });
            })
    }, [])

    // Get movies from internal db on page loading
    React.useEffect(() => {
        // Set movies.all if its exist in local storage:
        if (localStorage.movies & localStorage.movies !== []) {
            console.log("Getting movies from local storage")
            return setMovies(prevState => {
                return {...prevState, all: JSON.parse(localStorage.getItem("movies"))}
            });
        }

        mainApi.getMovies()
            .then((res) => {
                setMovies(prevState => {
                    return {...prevState, saved: res};
                })
                setInfoMessage(prevState => {
                    if (res.length !== 0) {
                        return {...prevState, saved: "Пришло время найти фильм!"}
                    }
                    return {...prevState, saved: "У вас нет сохраненных фильмов!"}
                })
            })
            .catch((err) => {
                setInfoMessage(prevState => {
                    return {...prevState, saved: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."}
                });
                console.log(err);
            })
            .finally(() => {
                setShowPreloader(prevState => {
                    return {...prevState, saved: false}
                });
            })
    }, [])

    // TODO: Rename function
    // Multipurpose function allows to set state in depense of current path:
    function handlePath(state, setState, value) {
        if (location.pathname === "/movies") {
            return setState({...state, all: value});
        }
        setState({...state, saved: value})
    }

    // Search movies:
    // ===========================================
    function handleSearchInputChange(e) {
        handlePath(movieToFind, setMovieToFind, e.target.value);
        console.log(movieToFind);
        console.log(infoMessage);
        console.log(movies);
    }

    function searchMovie(movie) {
        if (shortFilterIsActive[globalMoviesFilter]) {
            if (movie.duration <= 40) {
                return movie.nameRU.toLowerCase().includes(movieToFind[globalMoviesFilter].toLowerCase());
            }
        } else {
            return movie.nameRU.toLowerCase().includes(movieToFind[globalMoviesFilter].toLowerCase());
        }
    }

    function handleSearchBtnClick(e) {
        e.preventDefault();
        
        const filteredMoviesArr = movies[globalMoviesFilter].filter((movie) => {
            return searchMovie(movie)
        });

        console.log(filteredMoviesArr);

        if (filteredMoviesArr.length === 0) {
            handlePath(filteredMovies, setFilteredMovies, [])
            handlePath(infoMessage, setInfoMessage, "Упс! Кажется, такого фильма нет в нашей коллекции...");
            return;
        }
        handlePath(filteredMovies, setFilteredMovies, filteredMoviesArr)

        setMoviesToShow(moviesPerPage);
    }

    function handleCheckboxChange() {
        handlePath(shortFilterIsActive, setShortFilterIsActive, !shortFilterIsActive[globalMoviesFilter]);
    }
    // ===========================================

    // Render movies and expand button:
    // ===========================================
    const moviesPerPage = 7;
    const [moviesToShow, setMoviesToShow] = React.useState(moviesPerPage);

    function getMoviesList() {
        console.log(filteredMovies[globalMoviesFilter]);
        return filteredMovies[globalMoviesFilter].slice(0, moviesToShow);
    }

    function handleExpandBtnClick() {
        setMoviesToShow(moviesToShow + 7);
    }

    // ===========================================

    return(
        <main className="movies">
            <SearchForm
                value={movieToFind[globalMoviesFilter]}
                handleSearchInputChange={handleSearchInputChange}
                handleSubmitClick={handleSearchBtnClick}
                onChechboxChange={handleCheckboxChange}
                fiterIsActive={shortFilterIsActive[globalMoviesFilter]}
            />
            
            {
                showPreloader[globalMoviesFilter] ? 
                    <Preloader /> 
                    : 
                    filteredMovies[globalMoviesFilter].length === 0 ?
                        <MoviesInfoMessage 
                            message={infoMessage[globalMoviesFilter]}
                        />
                        :
                        <MoviesCardList 
                            moviesList={getMoviesList}
                            handleClick={handleExpandBtnClick}
                            showExpandBtn={moviesToShow <= filteredMovies[globalMoviesFilter].length}
                        />
            }
        </main>
    )
}