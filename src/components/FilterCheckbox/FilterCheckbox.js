import React from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
    const [isActive, setIsActive] = React.useState();

    function handleChechboxChange() {
        setIsActive(!isActive);
    }

    return(
        <div 
            className="checkbox"
            onClick={handleChechboxChange}
        >
            <label className="checkbox__label">
                <input 
                    name="short"
                    id="short"
                    type="checkbox" 
                    className={`checkbox__switcher ${isActive && 'checkbox__switcher_is-active'}`}
                />
                Короткометражки
            </label>
        </div>
    )
}