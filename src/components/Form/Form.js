import FormSubmit from "../FormSubmit/FormSubmit";

import "./Form.css";

export default function Form(props) {

    // Function for rendering input components
    function renderInputComponent(input) {
        
        let Component = props.inputComponent

        return(
            <Component 
                key={input.label}
                label={input.label}
                type={input.type}
            />
        )
    }

    return(
        <section className="form">
            <form className="form__form-container">

                <h3 className="form__title">
                    {props.greeting}
                </h3>

                <div className="form__inputs">
                    {
                        props.inputsList.map((input) => {
                            return (
                                renderInputComponent(input)
                            )
                        })
                    }
                </div>

                <FormSubmit 
                    buttonText={props.buttonText}
                    altTextIsActive={true}
                    altText={props.altText}
                    altLink={props.altLink}
                    altLinkText={props.altLinkText}
                />

            </form>
        </section>
    )
        
}