import React from "react";

import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import ProfileControlPanel from "../ProfileControlPanel/ProfileControlPanel";
import FormSubmit from "../FormSubmit/FormSubmit";
import Inputs from "../Inputs/Inputs";
import ProfileInput from "../ProfileInput/ProfileInput";

import "./UserProfile.css";

export default function UserProfile(props) {

    return(
        <>
            <Header />
            {
                props.showPreloader ?
                <Preloader />
                :
                <main className="profile">
                    <form className="profile__form-container" onSubmit={props.handleSubmitClick}>

                        <h3 className="profile__title">
                            Привет, {props.userName}!
                        </h3>

                        <Inputs
                            block="profile"
                            disabled={!props.editProfileIsActive}
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
                            handleChange={props.handleChange}
                            errors={props.errorMessage}
                            values={props.values}
                            isValid={props.isValid}
                        />

                        {
                            props.editProfileIsActive ?
                            
                            <FormSubmit 
                                buttonText="Сохранить"
                                altTextIsActive={false}
                                altText={props.altText}
                                altLink={props.altLink}
                                altLinkText={props.altLinkText}
                                disabled={props.submitBtnDisabled}
                                errorMessage={props.errorMessage}
                            />
                            :
                            <ProfileControlPanel
                                handleEditProfile={props.handleEditProfileClick}
                                hanldeLogout={props.hanldeLogout}
                            />
                        }

                    </form>
                </main>
            }
            
        </>
    )
}