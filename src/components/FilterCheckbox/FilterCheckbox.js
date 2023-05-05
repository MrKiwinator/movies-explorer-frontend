import React from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
    const [isActive, setIsActive] = React.useState();

    function handleChechboxChange() {
        setIsActive(!isActive);
    }

    return(
        <div 
            className="checkbox__container"
            onClick={handleChechboxChange}
        >
            <input 
                name="short"
                id="short"
                type="checkbox" 
                className={`checkbox ${isActive && 'checkbox_is-active'}`}
            />
            <label for="short" className="checkbox__label">
                Короткометражки
            </label>
        </div>
    )
}