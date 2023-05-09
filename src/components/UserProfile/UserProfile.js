import React from "react";

import ProfileControlPanel from "../ProfileControlPanel/ProfileControlPanel";
import FormSubmit from "../FormSubmit/FormSubmit";
import Inputs from "../Inputs/Inputs";
import ProfileInput from "../ProfileInput/ProfileInput";

import "./UserProfile.css";

export default function UserProfile(props) {
    const [editProfileIsActive, setEditProfileIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [submitDisabled, setSubmitDisabled] = React.useState(true);

    React.useEffect(() => {
        setName(props.currentUser.name);
        setEmail(props.currentUser.email);
    }, [props.currentUser])

    function handleEditProfileClick() {
        setEditProfileIsActive(true);
    }

    function handleSubmitBtnState(e) {
        if (e.target.value === props.currentUser.name || e.target.value === props.currentUser.email) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
        
    }

    function handleNameChange(e) {
        setName(e.target.value);
        handleSubmitBtnState(e);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        handleSubmitBtnState(e);
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(name)
        props.onUserUpdate({name, email})
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
                            value: name,
                            handleChange: handleNameChange,
                        },
                        {
                            label: "E-mail",
                            type: "email",
                            value: email,
                            handleChange: handleEmailChange,
                        },
                    ]}
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
                        // errorMessage={"При обновлении профиля произошла ошибка."}
                    /> 
                    :
                    <ProfileControlPanel handleEditProfile={handleEditProfileClick}/>
                }

            </form>
        </section>
    )
}