import Inputs from "../Inputs/Inputs";
import AuthInput from "../AuthInput/AuthInput";
import FormSubmit from "../FormSubmit/FormSubmit";

import { useFormWithValidation } from "../FromValidator/FormValidator";

import "./AuthForm.css";

export default function AuthForm(props) {
    const { values, errors, handleChange, isValid } = useFormWithValidation();

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