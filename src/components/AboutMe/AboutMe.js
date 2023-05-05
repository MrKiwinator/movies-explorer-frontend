import './AboutMe.css';
import myPhoto from '../../images/my-photo.jpg'

export default function AboutMe(props) {
    return(
        <section className="about-me" id="about-me">
            <div className="about-me__container">
                <h2 className="about-me__title">
                    Студент
                </h2>
                <div className="about-me__content">
                    <div className="about-me__info">
                        <h3 className="about-me__subtitle">
                            Михаил
                        </h3>
                        <h4 className="about-me__description">
                            Фронтенд-разработчик, 29 лет
                        </h4>
                        <p className="about-me__text">
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                        <div className="about-me__link-container">
                            <a className="about-me__link" href="/">
                                Github
                            </a>
                        </div>
                    </div>
                    
                    <img className="about-me__img" src={myPhoto} alt="Myself" />
                </div>
            </div>
        </section>
    )
}