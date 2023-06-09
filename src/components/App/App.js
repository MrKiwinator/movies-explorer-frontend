import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import MoviesAll from '../MoviesAll/MoviesAll';
import MoviesSaved from '../MoviesSaved/MoviesSaved';
import PageNotFound from '../PageNotFound/PageNotFound';
import UserLogin from '../UserLogin/UserLogin';
import UserRegister from '../UserRegister/UserRegister';
import UserProfile from '../UserProfile/UserProfile';
import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from "../../context/CurrentUserContext";

import { useFormWithValidation } from "../../utils/customHooks/useFormValidator";

import auth from "../../utils/auth";
import mainApi from "../../utils/mainApi";

function App() {

    // ======= Custom hook for validation =======
    const { values, setValues, errors, handleChange, isValid } = useFormWithValidation();

    // ======= Hook for navigation: =======
    const navigate = useNavigate();

    // ======= Hook to get current location =======
    const location = useLocation();



    // ======= State hooks =======
    // =================================================
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [showPreloader, setShowPreloader] = React.useState(false)

    const [popupIsOpen, setPopupIsOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [successMessage, setSuccessMessage] = React.useState("");
    const [failMessage, setFailMessage] = React.useState("");

    const [loginSubmitBtnDisabled, setLoginSubmitBtnDisabled] = React.useState(false);
    const [registerSubmitBtnDisabled, setRegisterSubmitBtnDisabled] = React.useState(false);
    const [userUpdateSubmitBtnDisabled, setUserUpdateSubmitBtnDisabled] = React.useState(true);

    const [editProfileIsActive, setEditProfileIsActive] = React.useState(false);

    const [userUpdateErrorMessage, setUserUpdateErrorMessage] = React.useState("")
    // =================================================



    // ======= Effect hooks =======
    // =================================================
    // Used to get user info and pass auth:
    React.useEffect(() => {
        setShowPreloader(true);

        mainApi.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
                setLoggedIn(true);
                navigate(location.pathname, {replace: true});
            })
            .catch((err) => {
                console.log(err);
                setLoggedIn(false);
                localStorage.clear();
            })
            .finally(() => {
                setShowPreloader(false);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    // Used to set up the state of form submit buttons:
    React.useEffect(() => {
        setLoginSubmitBtnDisabled(!isValid);
        setRegisterSubmitBtnDisabled(!isValid);
        setUserUpdateSubmitBtnDisabled(!isValid);
    }, [isValid])

    // Set initial input state as current user data on user update:
    React.useEffect(() => {
        setValues(prevValue => {
            return {...prevValue, name: currentUser.name, email: currentUser.email}
        })
    }, [currentUser.email, currentUser.name, setValues])

    // Handle error message on user update:
    React.useEffect(() => {
        if (values.name === currentUser.name & values.email === currentUser.email) {
            setUserUpdateSubmitBtnDisabled(true);
            setUserUpdateErrorMessage("Измените данные пользователя");
            return;
        }
        else if (!isValid) {
            setUserUpdateSubmitBtnDisabled(true);
            setUserUpdateErrorMessage("Пожалуйста, проверьте правильность ввода данных");
            return;
        }
        setUserUpdateSubmitBtnDisabled(false);
        setUserUpdateErrorMessage("");

    }, [currentUser, values, isValid])
    // =================================================


    // USER LOGIN
    // =================================================
    function handleUserLogin() {
        setLoggedIn(true);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, password} = values;

        setLoginSubmitBtnDisabled(true);

        setShowPreloader(true)

        auth.authorize(email, password)
            .then((data) => {
                if (data._id) {
                    handleUserLogin(e);
                    navigate('/movies', {replace: true});
                }
            })   
            .catch(() => {
                setTooltipStatus("failed");
                setFailMessage("Что-то пошло не так :(")
                setPopupIsOpen(true);
            })
            .finally(() => {
                setLoginSubmitBtnDisabled(false);
                setShowPreloader(false)
            })
    }
    // =================================================

    
    // USER REGISTRATION
    // =================================================
    const handleRegistrationSubmit = (e) => {
        e.preventDefault();

        const { name, email, password} = values;

        setRegisterSubmitBtnDisabled(true);

        setShowPreloader(true);

        auth.register(name, email, password)
            .then(() => {
                // If registration was successful - try to authorize with same data
                auth.authorize(email, password)
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
                        navigate("/signin");
                        popupIsOpen(false);
                    })
            })
            .catch(() => {
                setTooltipStatus("failed");
                setFailMessage("Что-то пошло не так :(")
                setPopupIsOpen(true);
            })
            .finally(() => {
                setRegisterSubmitBtnDisabled(false);
                setShowPreloader(false);
            })
    }
    // =================================================



    // USER UPDATE:
    // =================================================
    function handleEditProfileClick() {
        setEditProfileIsActive(true);
    }

    const handleUserUpdateSubmit = (e) => {
        e.preventDefault();

        const { name, email } = values;

        // To don't let to send request in input values equal to current user data:
        if (name === currentUser.name & email === currentUser.email) {
            return;
        }

        setUserUpdateSubmitBtnDisabled(true);

        setShowPreloader(true);

        mainApi.setUserInfo(name, email)
            .then(() => {
                setCurrentUser(prevValue => {
                    return {...prevValue, name, email}
                })
                setSuccessMessage("Вы успешно изменили данные!");
                setTooltipStatus("success");
                setPopupIsOpen(true);
                setEditProfileIsActive(false)
            })
            .catch((err) => {
                console.log(err);
                setFailMessage("Что-то пошло не так :(")
                setTooltipStatus("failed");
                setPopupIsOpen(true);
            })
            .finally(() => {
                setUserUpdateSubmitBtnDisabled(false);
                setShowPreloader(false);
            })
    }
    // =================================================



    // USER LOGOUT:
    // =================================================
    const handleUserLogout = (e) => {
        e.preventDefault();

        auth.logout(currentUser._id)
            .catch((err) => {
                console.log(err);
            })
        // Removing all data from local storage
        localStorage.clear();
        navigate('/', {replace: true});
        setLoggedIn(false)
    }
    // =================================================



    // POPUP:
    // =================================================
    // If click on ovelay during closing of popup, it could be opened again.
    // So to avoid such issue function of popup open/close were separated
    function openPopup() {
        setPopupIsOpen(true);
    }

    function closePopup() {
        setPopupIsOpen(false);
    }
    // =================================================


    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Routes>

                    <Route
                        path="/signup"
                        element={
                            <ProtectedRoute 
                                element={UserRegister}
                                loggedIn={!loggedIn}
                                path={"/movies"}
                                showPreloader={showPreloader}
                                handleSubmitClick={handleRegistrationSubmit}
                                submitBtnDisabled={registerSubmitBtnDisabled}
                                handleChange={handleChange}
                                values={values}
                                errors={errors}
                                isValid={isValid}
                            />
                        }
                    />

                    <Route
                        path="/signin"
                        element={
                            <ProtectedRoute 
                                element={UserLogin}
                                loggedIn={!loggedIn}
                                path={"/movies"}
                                showPreloader={showPreloader}
                                handleSubmitClick={handleLoginSubmit}
                                submitBtnDisabled={loginSubmitBtnDisabled}
                                handleChange={handleChange}
                                values={values}
                                errors={errors}
                                isValid={isValid}
                            />
                        }
                    />
                    
                    <Route 
                        path="/" 
                        element={           
                            <Main 
                                loggedIn={loggedIn}
                            />
                        }
                    />

                    <Route 
                        path="*"
                        element={
                            <PageNotFound />
                        }
                    />

                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute 
                                element={MoviesAll}
                                loggedIn={loggedIn}
                                path={"/signin"}
                            />
                        }
                    />

                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute 
                                element={MoviesSaved}
                                loggedIn={loggedIn}
                                path={"/signin"}
                            />
                            
                        }
                    />

                    <Route
                        path="/Profile"
                        element={
                            <ProtectedRoute 
                                element={UserProfile}
                                loggedIn={loggedIn}
                                path={"/signin"}
                                editProfileIsActive={editProfileIsActive}
                                handleEditProfileClick={handleEditProfileClick}
                                handleSubmitClick={handleUserUpdateSubmit}
                                handleChange={handleChange}
                                values={values}
                                isValid={isValid}
                                userName={currentUser.name}
                                hanldeLogout={handleUserLogout}
                                openPopup={openPopup}
                                submitBtnDisabled={userUpdateSubmitBtnDisabled}
                                errorMessage={userUpdateErrorMessage}
                                showPreloader={showPreloader}
                            />
                        }
                    />

                </Routes>
                <PopupInfoTooltip
                    isOpen={popupIsOpen}
                    onClose={closePopup}
                    tooltipStatus={tooltipStatus}
                    successMessage={successMessage}
                    failMessage={failMessage}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App; 
