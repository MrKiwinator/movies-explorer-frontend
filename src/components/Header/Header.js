import './Header.css';
import logoPath from '../../images/logo.svg';

export default function Header(props) {
    return(
        <header class="header">
            <div class="header__container"> 
                <a class="header__logo-link" href="/">
                    <img class="header__logo" src={logoPath} alt="Logotype" />
                </a>
                <div class="header__menu">
                    <button class="header__button header__button_bg_transparent">Регистрация</button>
                    <button class="header__button">Войти</button>
                </div>
            </div>
        </header>
    )
}