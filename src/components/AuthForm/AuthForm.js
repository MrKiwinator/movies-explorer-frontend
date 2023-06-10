import React from 'react';

import Inputs from "../Inputs/Inputs";
import AuthInput from "../AuthInput/AuthInput";
import FormSubmit from "../FormSubmit/FormSubmit";

import "./AuthForm.css";

export default function AuthForm(props) {
    return(
        <section className="auth-form">
            <form 
                className="auth-form__form-container"
                onSubmit={props.handleSubmitClick}
            >

                <h3 className="auth-form__title">
                    {props.greeting}
                </h3>

                <Inputs
                    block="auth"
                    inputComponent={AuthInput}
                    inputsList={props.inputsList}
                    handleChange={props.handleChange}
                    values={props.values}
                    errors={props.errors}
                    isValid={props.isValid}
                />

                <FormSubmit 
                    buttonText={props.buttonText}
                    altTextIsActive={true}
                    altText={props.altText}
                    altLink={props.altLink}
                    altLinkText={props.altLinkText}
                    disabled={props.disabled}
                />

            </form>
        </section>
    )
        
}