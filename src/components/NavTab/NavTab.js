import './NavTab.css';

export default function NavTab(props) {
    return(
        <nav className="nav">
            <div className="nav__container">
                <ul className="nav__list">
                    <li className="nav__list-item">
                        <a className="nav__link" href="#about-project">О проекте</a>
                    </li>
                    <li className="nav__list-item">
                        <a className="nav__link" href="#techs">Технологии</a>
                    </li>
                    <li className="nav__list-item">
                        <a className="nav__link" href="#about-me">Студент</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}