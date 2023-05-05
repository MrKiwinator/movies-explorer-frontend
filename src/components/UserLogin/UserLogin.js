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
            greeting="Рады видеть!"
            buttonText="Войти"
            altText="Ещё не зарегистрированы?"
            altLink="/signup"
            altLinkText="Зарегестрироваться"
        />
    )
}