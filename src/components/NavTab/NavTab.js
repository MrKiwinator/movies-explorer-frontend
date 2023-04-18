import './NavTab.css';

export default function NavTab(props) {
    return(
        <nav class="nav">
            <div class="nav__container">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a class="nav__link" href="/">О проекте</a>
                    </li>
                    <li class="nav__item">
                        <a class="nav__link" href="/">Технологии</a>
                    </li>
                    <li class="nav__item">
                        <a class="nav__link" href="/">Студент</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}