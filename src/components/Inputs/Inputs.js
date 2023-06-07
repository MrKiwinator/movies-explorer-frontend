import React from "react";

import "./Inputs.css";

export default function Inputs(props) {

    // Function for rendering input components
    function renderInputComponent(input) {
        
        const Component = props.inputComponent

        return(
            <Component
                key={input.type}
                label={input.label}
                type={input.type}
                disabled={props.disabled}
                handleChange={props.handleChange}
                value={props.values[input.type]}
                errorMessage={props.errors[input.type]}
                minLength={input.minLength}
                maxLength={input.maxLength}
            />
        )
    }

    return(
        <div className={`${props.block}__inputs`}>
            {
                props.inputsList.map((input) => {
                    return (
                        renderInputComponent(input)
                    )
                })
                
            }
        </div>
    )
}