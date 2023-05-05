import Auth from "../Auth/Auth";

import "./UserRegister.css";

export default function UserRegister(props) {
    return(
        <Auth 
            inputsList={[
                {
                    label: "Имя",
                    type: "name",
                },
                {
                    label: "E-mail",
                    type: "email",
                },
                {
                    label: "Пароль",
                    type: "password",
                },
            ]}
            greeting="Добро пожаловать!"
            buttonText="Зарегестрироваться"
            altText="Уже зарегистрированы?"
            altLink="/signin"
            altLinkText="Войти"
        />
    )
}