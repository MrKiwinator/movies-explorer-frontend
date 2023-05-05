import "./ProfileInput.css";

export default function ProfileInput(props) {
    return (
        <div className="input-container">
            <label className="input-container__input-label" for={props.type}>
                {props.label}
            </label>
            <input
                id={`${props.type}-input`}
                type={props.type}
                name={props.type}
                className={`input-container__input input_type_${props.type}`}
                required />
            {/* Text of an error for test only (TODO change after review) */}
            <span className={`input-container__input-error user-${props.type}-input-error`}>Что-то пошло не так...</span>
        </div>
    )
}