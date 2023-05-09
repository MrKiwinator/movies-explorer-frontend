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
            <label className="checkbox__label">
                <input 
                    name="short"
                    id="short"
                    type="checkbox" 
                    className={`checkbox ${isActive && 'checkbox_is-active'}`}
                />
                Короткометражки
            </label>
        </div>
    )
}