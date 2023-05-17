import React from "react";

import "./ProfileInput.css";

export default function ProfileInput(props) {
    return (
        <div className="profile__input-container">
            <label className="profile__input-label" htmlFor={props.type}>
                {props.label}
            </label>
            <input
                id={`${props.type}-input`}
                type={props.type}
                name={props.type}
                disabled={props.disabled}
                value={props.value}
                onChange={props.handleChange}
                className={
                    `profile__input input ${
                        !props.disabled ? "profile__input_active" : ""
                    } input_type_${props.type}`
                }
                placeholder={`Введите ${props.label.toLowerCase()}`}
                required
            />
        </div>
    )
}