import Form from "../Form/Form";
import ProfileInput from "../ProfileInput/ProfileInput";

import "./UserProfile.css";

export default function UserProfile(props) {
    return(
        <section className="profile">
            <Form
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
                greeting={`Рады видеть, ${props.userName}`}
                buttonText="Сохранить"
                altTextIsActive={false}
                inputComponent={ProfileInput}
            />
            
        </section>
    )
}