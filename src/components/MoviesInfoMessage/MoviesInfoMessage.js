import "./MoviesInfoMessage.css"

export default function MoviesInfoMessage(props) {
    return (
        <div className="message">
            <h2 className="message__text">{props.message}</h2>
        </div>
    )
}