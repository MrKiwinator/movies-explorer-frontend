import { Link } from 'react-router-dom';

import './Portfolio.css';

export default function Portfolio(props) {
    return(
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">
                    Портфолио
                </h2>
                <ul className="portfolio__list">
                    <li className="portfolio__list-item">
                        <Link className="portfolio__link" to="https://github.com/MrKiwinator/how-to-learn" target="_blank">
                            <p className="portfolio__link-text">
                                Статичный сайт
                            </p>
                            <p className="portfolio__link-arrow">&#x2197;</p>
                        </Link>
                    </li>
                    <li className="portfolio__list-item">
                        <Link className="portfolio__link" to="https://github.com/MrKiwinator/russian-travel" target="_blank">
                            <p className="portfolio__link-text">
                                Адаптивный сайт
                            </p>
                            <p className="portfolio__link-arrow">&#x2197;</p>
                        </Link>
                    </li>
                    <li className="portfolio__list-item">
                        <Link className="portfolio__link" to="https://github.com/MrKiwinator/react-mesto-api-full-gha" target="_blank">
                            <p className="portfolio__link-text">
                                Одностраничное приложение
                            </p>
                            <p className="portfolio__link-arrow">&#x2197;</p>
                        </Link>
                    </li>
                </ul>
                
                
                
            </div>
        </section>
    )
}