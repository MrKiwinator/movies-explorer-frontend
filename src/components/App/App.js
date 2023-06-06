import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MoviesAll from '../MoviesAll/MoviesAll';
import MoviesSaved from '../MoviesSaved/MoviesSaved';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import UserLogin from '../UserLogin/UserLogin';
import UserRegister from '../UserRegister/UserRegister';
import UserProfile from '../UserProfile/UserProfile';
import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';

// import { CurrentUserContext } from "../context/CurrentUserContext";
import { useFormWithValidation } from "../../utils/customHooks/useFormValidator";

import auth from "../../utils/auth";

function App() {

    const { values, setValues, errors, handleChange, isValid } = useFormWithValidation();

    // ======= Hook for navigation: =======
    const navigate = useNavigate();
    
    const [popupIsOpen, setPopupIsOpen] = React.useState(false);

    // TODO: Remove after all good
    const [currentUser, setCurrentUser] = React.useState({})

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [tooltipStatus, setTooltipStatus] = React.useState("")

    function handleUserLogin() {
        setLoggedIn(true);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        console.log(values)

        if (!values.email || !values.password) {
            return;
        }

        auth.authorize(values.email, values.password)
            .then((data) => {
                if (data._id) {
                    setValues(prevValues => {
                        return {...prevValues, email: "", password: ""}
                    })
                    handleUserLogin(e);
                    navigate('/movies', {replace: true});
                }
            })   
            .catch(() => {
                setTooltipStatus("failed");
                setPopupIsOpen(true);
            })
    }

    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
        
    //     if (!formLoginValue.email || !formLoginValue.password) {
    //         return;
    //     }

    //     auth.authorize(formLoginValue.email, formLoginValue.password)
    //         .then((data) => {
    //             if (data._id) {
    //                 setUserEmail(formLoginValue.email);
    //                 setFormLoginValue({email: '', password: ''});
    //                 handleUserLogin(e);
    //                 navigate('/', {replace: true});
    //             }
    //         })   
    //         .catch(() => {
    //             setTooltipStatus("failed");
    //             setInfoTooltipOpen(true);
    //         })
    // }

    function handleUserUpdate(userInfo) {
        setCurrentUser(userInfo);
    }

    // POPUP:
    // If click on ovelay during closing of popup, it could be opened again.
    // So to avoid such issue function of popup open/close were separated

    function openPopup() {
        setPopupIsOpen(true);
    }

    function closePopup() {
        setPopupIsOpen(false);
    }

    return (
        // <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Routes>

                    <Route
                        path="/signup"
                        element={
                            <>
                                <UserRegister 
                                    // handleSubmit={handleRegistrationSubmit}
                                    handleChange={handleChange}
                                    values={values}
                                    errors={errors}
                                    isValid={isValid}
                                />
                            </>
                        }
                    />

                    <Route
                        path="/signin"
                        element={
                            <>
                                <UserLogin 
                                    handleSubmitClick={handleLoginSubmit}
                                    handleChange={handleChange}
                                    values={values}
                                    errors={errors}
                                    isValid={isValid}
                                />
                                <PopupInfoTooltip
                                    isOpen={popupIsOpen}
                                    onClose={closePopup}
                                    tooltipStatus={tooltipStatus}
                                    failMessage="Что-то пошло не так, попробуйте позже"
                                />
                            </>
                        }
                    />
                    
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Header
                                    loggedIn={loggedIn}
                                />
                                <Main /> 
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="/movies"
                        element={
                            <>
                                <Header />
                                <MoviesAll />
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="/saved-movies"
                        element={
                            <>
                                <Header />
                                <MoviesSaved />
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="/Profile"
                        element={
                            <>  
                                <Header />
                                <UserProfile 
                                    currentUser={currentUser}
                                    onUserUpdate={handleUserUpdate}
                                    openPopup={openPopup}
                                />
                                <PopupInfoTooltip
                                    // TODO: remove after review:
                                    // tooltipStatus="failed"
                                    isOpen={popupIsOpen}
                                    onClose={closePopup}
                                    tooltipStatus={tooltipStatus}
                                    successMessage="Вы успешно изменили данные!"
                                    failMessage="При обновлении профиля произошла ошибка."
                                />
                            </>
                        }
                    />

                    <Route 
                        path="*"
                        element={
                            <PageNotFound />
                        }
                    />

                </Routes>
            </div>
        // </CurrentUserContext.Provider>
    );
}

export default App; 
