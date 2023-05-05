import "./AuthInput.css";

export default function AuthInput(props) {
    return(
        <div className="auth__input-container">
            <label className="auth__input-label" for={props.type}>
                {props.label}
            </label>
            <input 
                id={`${props.type}-input`}
                type={props.type}
                name={props.type}
                className={`auth__input input_type_${props.type}`}
                required />
            {/* Text of an error for test only (TODO change after review) */}
            <span className={`auth__input-error user-${props.type}-input-error`}>Что-то пошло не так...</span>
        </div>
    )
}