import { Link } from 'react-router-dom';

import './MenuMain.css';

export default function MenuMain(props) {

    return(
        <div className="menu-main">
            <Link to="/signup" className="menu-main__link menu-main__link_bg_transparent">
                Регистрация
            </Link>
            <Link to="/signin" className="menu-main__link">
                Войти
            </Link>
        </div>
    )
}