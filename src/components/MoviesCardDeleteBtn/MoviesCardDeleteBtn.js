import "./MoviesCardDeleteBtn.css";

export default function MoviesCardDeleteBtn(props) {
    function handleClick() {
        props.onMovieDelete(props.movieId)
    }

    return (
        <button 
            type="button" 
            aria-label="Удалить" 
            onClick={handleClick}
            className="card__delete"
        />
    )
}