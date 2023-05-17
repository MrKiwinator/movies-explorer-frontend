import { Link } from 'react-router-dom';

import './MenuMovies.css';
import profileIcon from '../../images/profile.svg'

export default function MenuMovies(props) {
    return (
        <div className="menu-movies">
            <Link to="/movies" className="menu-movies__link menu-movies__link_bold">
                Фильмы
            </Link>
            <Link to="/saved-movies" className="menu-movies__link">
                Сохраненные фильмы
            </Link>
            <Link to="/profile" className="menu-movies__link-box">
                <p className="menu-movies__link-box-text">
                    Аккаунт
                </p>
                <img src={profileIcon} alt="Профиль" />    
            </Link>
        </div>
    )
}