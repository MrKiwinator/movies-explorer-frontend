import React from "react";

import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";

import "./Auth.css";

export default function Auth(props) {

    return(
        <div className="auth">
            <div className="auth__container">
                <Header />
                <AuthForm
                    handleSubmitClick={props.handleSubmitClick}
                    handleChange={props.handleChange}
                    values={props.values}
                    errors={props.errors}
                    isValid={props.isValid}
                    greeting={props.greeting}
                    inputsList={props.inputsList}
                    buttonText={props.buttonText}
                    altText={props.altText}
                    altLink={props.altLink}
                    altLinkText={props.altLinkText}
                />
            </div>
        </div>
    )
}