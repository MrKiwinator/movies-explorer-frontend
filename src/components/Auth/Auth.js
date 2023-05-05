import Header from "../Header/Header";
import Form from "../Form/Form";
import AuthInput from "../AuthInput/AuthInput";

import "./Auth.css";

export default function Auth(props) {
    return(
        <div className="auth__container">
            <Header />
            <Form
                greeting="Добро пожаловать!"
                inputComponent={AuthInput}
                inputsList={props.inputsList}
                buttonText={props.buttonText}
                altText={props.altText}
                altLink={props.altLink}
                altLinkText={props.altLinkText}
            />
        </div>
    )
}