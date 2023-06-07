import "./AuthInput.css";

export default function AuthInput(props) {
    return(
        <div className="auth__input-container">
            <label className="auth__input-label" htmlFor={`${props.type}-input`}>
                {props.label}
            </label>
            <input
                onChange={props.handleChange}
                id={`${props.type}-input`}
                type={props.type}
                name={props.type}
                className={`auth__input input input_type_${props.type} ${props.errorMessage ? "auth__input_color_red" : ""}`}
                placeholder={`Введите ${props.label.toLowerCase()}`}
                required 
                minLength={props.minLength}
                maxLength={props.maxLength}
            />
            {/* Text of an error for test only (TODO change after review) */}
            <span className={`auth__input-error user-${props.type}-input-error`}>{props.errorMessage}</span>
        </div>
    )
}