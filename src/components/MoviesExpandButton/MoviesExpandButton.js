import './MoviesExpandButton.css';

export default function MoviesExpandButton(props) {
    return(
        <div className="cards__expand-button-container">
            <button 
                onClick={props.onClick}
                type="button" 
                aria-label="Расширить список фильмов" 
                className="cards__expand-button cards__expand-button_active"
            >
                Ещё
            </button>
        </div>
    )
}