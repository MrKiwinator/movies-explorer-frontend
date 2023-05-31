import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import UserLogin from '../UserLogin/UserLogin';
import UserRegister from '../UserRegister/UserRegister';
import UserProfile from '../UserProfile/UserProfile';
import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';

import auth from "../../utils/auth";

function App() {

    // ======= Hook for navigation: =======
    const navigate = useNavigate();
    
    const [popupIsOpen, setPopupIsOpen] = React.useState(false);

    // TODO: Remove after all good
    const [currentUser, setCurrentUser] = React.useState({name: "asd", email: "asd@asd.asd"})

    // ======= Registration hooks: =======

    const [formRegValue, setFormRegValue] = React.useState({
        email: '',
        password: '',
    })

    // ======= Login hooks: =======

    const [formLoginValue, setFormLoginValue] = React.useState({
        email: '',
        password: '',
    })

    const [loggedIn, setLoggedIn] = React.useState(false);

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
        <div className="app">
            <Routes>

                <Route
                    path="/signup"
                    element={
                        <>
                            <UserRegister />
                        </>
                    }
                />

                <Route
                    path="/signin"
                    element={
                        <>
                            <UserLogin />
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
                            <Movies />
                            <Footer />
                        </>
                    }
                />

                <Route
                    path="/saved-movies"
                    element={
                        <>
                            <Header />
                            <Movies />
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
                                tooltipStatus="success"
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
    );
}

export default App; 
