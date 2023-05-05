import "./MoviesCardDeleteBtn.css";

export default function MoviesCardDeleteBtn(props) {
    return (
        <button 
            type="button" 
            aria-label="Удалить" 
            onClick={props.handleDeleteClick}
            className="card__delete"
        />
    )
}