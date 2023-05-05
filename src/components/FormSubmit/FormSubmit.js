import React from "react";
import { Link } from "react-router-dom";

import "./FormSubmit.css";

export default function FormSubmit(props) {
    return(
        <div className="form-submit">
            <button type="submit" className="form-submit__submit-button">
                {props.buttonText}
            </button>

            {
                props.altTextIsActive && 

                <p className="form-submit__alt-text">
                {props.altText}
                    <Link 
                        className="form-submit__alt-link"
                        to={props.altLink}
                    >
                        {props.altLinkText}
                    </Link>
                </p>
            }  

        </div>
    )
}