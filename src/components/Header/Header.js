import React from "react";
import { 
    useLocation, 
    Link 
} from "react-router-dom";
import Menu from "../Menu/Menu";
import './Header.css';
import logoPath from '../../images/logo.svg';

export default function Header(props) {
    const location = useLocation();

    return(
        <header 
            className={`header ${
                location.pathname === "/" && "header_bg_blue"
            }`}
        >
            <div 
                className={
                    `header__container ${
                        (
                            location.pathname === "/signin" || 
                            location.pathname === "/signup"
                        ) && "header__container_no-padding header__container_justify-content_center"
                    }`
                }
            >
                <Link className="header__logo-link" to="/">
                    <img className="header__logo" src={logoPath} alt="Logotype" />
                </Link>
                <Menu />
            </div>
        </header>
    )
}