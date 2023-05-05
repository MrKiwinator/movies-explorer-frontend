import React from 'react';
import { useLocation } from 'react-router-dom';

import MenuMain from '../MenuMain/MenuMain';
// import MenuMovies from '../MenuMovies/MenuMovies';
import MenuMovies from '../MenuMovies/MenuMovies';
import MenuSideButton from '../MenuSideButton/MenuSideButton';
import MenuSide from '../MenuSide/MenuSide';

import './Menu.css';

export default function Menu(props) {
    const [sideMenuActive, setSideMenuActive] = React.useState(false);

    function handleSideMenu() {
        setSideMenuActive(!sideMenuActive);
    }

    const location = useLocation();

    return (
        <>
            {
                location.pathname === "/" ?
                    <MenuMain />
                : (
                    location.pathname === "/movies" || 
                    location.pathname === "/saved-movies" ||
                    location.pathname === "/profile"
                ) && 
                    <>
                        {/* Will be visible for the screens more than 768px */}
                        <MenuMovies />
                        {/* Will be vivible for the screens less than 768px */}
                        <MenuSideButton handleOpenSideMenu={handleSideMenu} />
                        <MenuSide 
                            isActive={sideMenuActive} 
                            handleCloseSideMenu={handleSideMenu}
                        />
                    </>
                    
            }
        </>
    )
}