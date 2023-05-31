import React from "react";

import Auth from "../Auth/Auth";

import auth from "../../utils/auth";

import "./UserRegister.css";

export default function UserRegister(props) {
    const [formRegValue, setFormRegValue] = React.useState({
        name: '',
        email: '',
        password: '',
    })

    // ======= Registration of new user: =======

    // const handleRegInputChange = (e) => {
    //     const {name, value} = e.target;
    
    //     setFormRegValue({
    //         ...formRegValue,
    //         [name]: value
    //     });
    // }

    const handleUserRegSubmit = (e) => {
        e.preventDefault();
        
        const { name, email, password } = formRegValue;

        auth.register(name, email, password)
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

    return(
        <Auth 
            inputsList={[
                {
                    label: "Имя",
                    type: "name",
                    errorMessage: {}
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
            // handleChange={handleRegInputChange}
            handleSubmitClick={handleUserRegSubmit}
            greeting="Добро пожаловать!"
            buttonText="Зарегестрироваться"
            altText="Уже зарегистрированы?"
            altLink="/signin"
            altLinkText="Войти"
        />
    )
}