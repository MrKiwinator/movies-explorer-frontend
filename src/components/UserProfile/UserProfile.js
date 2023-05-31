import React from "react";

import ProfileControlPanel from "../ProfileControlPanel/ProfileControlPanel";
import FormSubmit from "../FormSubmit/FormSubmit";
import Inputs from "../Inputs/Inputs";
import ProfileInput from "../ProfileInput/ProfileInput";

import { useFormWithValidation } from "../FromValidator/FormValidator";

import "./UserProfile.css";

export default function UserProfile(props) {
    const { 
        values,
        setValues,
        errors, 
        handleChange, 
        isValid,
    } = useFormWithValidation();

    const [editProfileIsActive, setEditProfileIsActive] = React.useState(false);

    // Hook to set initial user info:
    // ===================================
    React.useEffect(() => {
        setValues(props.currentUser);
    }, [props.currentUser, setValues])
    // ===================================

    // Hooks for checking if submit button need to be active and set error messages:
    // ===================================
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        if (JSON.stringify(values) === JSON.stringify(props.currentUser)) {
            setSubmitDisabled(true);
            setErrorMessage("Измените данные пользователя");
            return;
        }
        else if (!isValid) {
            setSubmitDisabled(true);
            setErrorMessage("Пожалуйста, проверьте правильность ввода данных");
            return;
        }
        setSubmitDisabled(false);
    }, [props.currentUser, values, submitDisabled, isValid])
    // ===================================

    function handleEditProfileClick() {
        setEditProfileIsActive(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUserUpdate(values)
        setEditProfileIsActive(false);
        setSubmitDisabled(true);
        props.openPopup();
    }

    return(
        <section className="profile">
            <form className="profile__form-container" onSubmit={handleSubmit}>

                <h3 className="profile__title">
                    Привет, {props.currentUser.name}!
                </h3>

                <Inputs
                    block="profile"
                    disabled={!editProfileIsActive}
                    inputComponent={ProfileInput}
                    inputsList={[
                        {
                            label: "Имя",
                            type: "name",
                        },
                        {
                            label: "E-mail",
                            type: "email",
                        },
                    ]}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                />

                {
                    editProfileIsActive ?
                    
                    <FormSubmit 
                        buttonText="Сохранить"
                        altTextIsActive={false}
                        altText={props.altText}
                        altLink={props.altLink}
                        altLinkText={props.altLinkText}
                        disabled={submitDisabled}
                        // Uncomment to check error message:
                        errorMessage={errorMessage}
                    />
                    :
                    <ProfileControlPanel handleEditProfile={handleEditProfileClick}/>
                }

            </form>
        </section>
    )
}