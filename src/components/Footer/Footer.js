import './Footer.css';

export default function Footer(props) {
    return(
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__flex">
                    <p className="footer__copyright">
                        &copy; {new Date().getFullYear()} 
                    </p>
                    <div className="footer__links">
                        <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer noopener">Яндекс.Практикум</a>
                        <a className="footer__link" href="https://github.com/MrKiwinator" target="_blank" rel="noreferrer noopener">Github</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}