import React from "react";

export function useFormWithValidation() {
    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest("form").checkValidity());
    };
  
    React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    ); 

    return { values, setValues, handleChange, errors, isValid};
}