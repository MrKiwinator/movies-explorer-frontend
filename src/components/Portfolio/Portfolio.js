import './Portfolio.css';

export default function Portfolio(props) {
    return(
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">
                    Портфолио
                </h2>
                <a className="portfolio__link" href="https://github.com/MrKiwinator/how-to-learn">
                    <p className="portfolio__link-text">
                        Статичный сайт
                    </p>
                    <p className="portfolio__link-arrow">&#x2197;</p>
                </a>
                <a className="portfolio__link" href="https://github.com/MrKiwinator/russian-travel">
                    <p className="portfolio__link-text">
                        Адаптивный сайт
                    </p>
                    <p className="portfolio__link-arrow">&#x2197;</p>
                </a>
                <a className="portfolio__link" href="https://github.com/MrKiwinator/react-mesto-api-full-gha">
                    <p className="portfolio__link-text">
                        Одностраничное приложение
                    </p>
                    <p className="portfolio__link-arrow">&#x2197;</p>
                </a>
            </div>
        </section>
    )
}