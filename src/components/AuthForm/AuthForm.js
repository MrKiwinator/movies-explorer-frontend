import React from 'react';
import { useLocation } from 'react-router-dom';

import Inputs from "../Inputs/Inputs";
import AuthInput from "../AuthInput/AuthInput";
import FormSubmit from "../FormSubmit/FormSubmit";

import { useFormWithValidation } from "../FromValidator/FormValidator";

import auth from "../../utils/auth";

import "./AuthForm.css";

export default function AuthForm(props) {
    const { values, errors, handleChange, isValid } = useFormWithValidation();
    
    const location = useLocation();

    const handleSubmitClick = (e) => {
        e.preventDefault();

        // User registration:
        if (location.pathname === "/signup") {
            auth.register(values.name, values.email, values.password)
                .then(() => {
                    console.log("success");
                })
                .catch(() => {
                    console.log("failed");  
                })
                .finally(() => {
                    console.log(true);
                })
        }

        // User login:
        if (location.pathname === "/signin") {
            auth.authorize(values.email, values.password)
                .then(() => {
                    props.handleUserLogin()
                })
        }

        console.log(values);
    }

    return(
        <section className="auth-form">
            <form 
                className="auth-form__form-container"
                onSubmit={handleSubmitClick}
            >

                <h3 className="auth-form__title">
                    {props.greeting}
                </h3>

                <Inputs
                    block="auth"
                    inputComponent={AuthInput}
                    inputsList={props.inputsList}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    isValid={isValid}
                />

                <FormSubmit 
                    buttonText={props.buttonText}
                    altTextIsActive={true}
                    altText={props.altText}
                    altLink={props.altLink}
                    altLinkText={props.altLinkText}
                    disabled={!isValid}
                />

            </form>
        </section>
    )
        
}