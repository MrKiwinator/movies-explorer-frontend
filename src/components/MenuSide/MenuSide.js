import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './MenuSide.css';
import profileIcon from '../../images/profile.svg';
import sideMenuClose from '../../images/side-menu-close.svg';

export default function MenuSide(props) {
    const location = useLocation();

    const overlay = React.useRef();

    function handleOverlayClick(e) {
        if (e.target === overlay.current) {
            props.handleCloseSideMenu();
        }
    }

    return(
        <div ref={overlay} onClick={handleOverlayClick} className={`side-menu ${props.isActive && "side-menu_active"}`}>
            <div className={`side-menu__container ${props.isActive && "side-menu__container_opened"}`}>
                <button
                    onClick={props.handleCloseSideMenu}
                    className="side-menu__close-button"
                >
                    <img src={sideMenuClose} alt="Закрыть меню" />
                </button>
                <div className="side-menu__menu">
                    <Link to="/" className="side-menu__link">
                        Главная
                    </Link>
                    <Link 
                        to="/movies" 
                        className={`side-menu__link ${location.pathname === "/movies" && "side-menu__link_active"}`}
                    >
                        Фильмы
                    </Link>
                    <Link 
                        to="/saved-movies" 
                        className={`side-menu__link ${location.pathname === "/saved-movies" && "side-menu__link_active"}`}
                    >
                        Сохраненные фильмы
                    </Link>
                </div>
                <div className="side-menu__profile">
                    <Link to="/profile" className="side-menu__link-box">
                        <p className="side-menu__link-box-text">
                            Аккаунт
                        </p>
                        <img src={profileIcon} alt="Профиль" />    
                    </Link>
                </div>
            </div>
        </div>
    )
}