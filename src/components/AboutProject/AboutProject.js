import './AboutProject.css';

export default function AboutProject(props) {
    return(
        <section className="about-project" id="about-project">
            <div className="about-project__container">
                
                <h2 className="about-project__title">О проекте</h2>
                
                <ul className="about-project__list">
                    <li className="about-project__list-item">
                        <h3 className="about-project__subtitle">
                            Дипломный проект включал 5 этапов 
                        </h3>
                        <p className="about-project__text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </li>
                    <li className="about-project__list-item">
                        <h3 className="about-project__subtitle">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about-project__text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </li>
                </ul>

                <div className="about-project__progress-bar progress-bar">
                    <div className="progress-bar__item-left">
                        <p className="progress-bar__text progress-bar__text_color_dark progress-bar__text_bg_green">
                            1 неделя
                        </p>
                        <p className="progress-bar__description">
                            Back-end
                        </p>
                    </div>
                    <div className="progress-bar__item-right">
                        <p className="progress-bar__text">
                            4 недели
                        </p>
                        <p className="progress-bar__description">
                            Front-end
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}