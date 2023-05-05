import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import UserLogin from '../UserLogin/UserLogin';
import UserRegister from '../UserRegister/UserRegister';
import UserProfile from '../UserProfile/UserProfile';

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false);

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
                            <UserProfile userName="Виталий" userEmail="pochta@yandex.ru"/>
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
