import React from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
    return(
        <div 
            className="checkbox"
        >
            <label className="checkbox__label">
                <input 
                    type="checkbox" 
                    name="short"
                    id="short"
                    checked={props.value}
                    onChange={props.onChange}
                    className={`checkbox__switcher ${props.value && 'checkbox__switcher_is-active'}`}
                />
                {props.label}
            </label>
        </div>
    )
}