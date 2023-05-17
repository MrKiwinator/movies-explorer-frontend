import { Link } from "react-router-dom";
import "./ProfileControlPanel.css";

export default function ProfileControlPanel(props) {   
    return(
        <div className="profile__controls">
            <button 
                onClick={props.handleEditProfile}
                className="profile__action-btn"
            >
                Редактировать
            </button>
            <Link 
                to="/signin"
                className="profile__link"
            >
                Выйти из аккаунта
            </Link>
        </div>
    )
}