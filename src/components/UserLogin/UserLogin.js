import Auth from "../Auth/Auth";

import "./UserLogin.css";

export default function UserLogin(props) {
    return(
        <Auth 
            inputsList={[
                {
                    label: "E-mail",
                    type: "email",
                },
                {
                    label: "Пароль",
                    type: "password",
                }
            ]}
            showPreloader={props.showPreloader}
            disabled={props.submitBtnDisabled}
            handleSubmitClick={props.handleSubmitClick}
            handleChange={props.handleChange}
            values={props.values}
            errors={props.errors}
            isValid={props.isValid}
            greeting="Рады видеть!"
            buttonText="Войти"
            altText="Ещё не зарегистрированы?"
            altLink="/signup"
            altLinkText="Зарегестрироваться"
        />
    )
}