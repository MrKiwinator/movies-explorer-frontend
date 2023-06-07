import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound(props) {
    // ======= Hook for navigation: =======
    const navigate = useNavigate();


    
    // NOT FOUND
    // =================================================
    function goBack() {
        navigate(-1, {replace: true});
    }
    // =================================================



    return(
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">
                    <div className="not-found__focus-text">404</div>
                    Страница не найдена
                </h1>
                <button 
                    className="not-found__button" 
                    onClick={goBack}>
                        Назад
                </button>
            </div>
        </section>
    )
}