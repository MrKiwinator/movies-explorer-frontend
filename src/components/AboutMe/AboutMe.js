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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur iaculis massa, a ullamcorper erat imperdiet vel. Etiam viverra massa vel volutpat pretium. In convallis sodales pretium. Phasellus non rutrum ligula, ac blandit sapien. Phasellus venenatis dui sit amet ipsum malesuada, non elementum sapien mollis. Sed malesuada ullamcorper efficitur.
                        </p>
                        <div className="about-me__link-container">
                            <a className="about-me__link" href="https://github.com/MrKiwinator">
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