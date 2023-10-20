import React from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export function useValidation(value, validations) {
  const [isEmpty, setEmpty] = React.useState("Введите текст");
  const [minLengthError, setMinLengthError] = React.useState("");
  const [maxLengthError, setMaxLengthError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [nameError, setNameError] = React.useState("")
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch(validation) {
        case 'minLength':
          value ? value.length < validations[validation] ? setMinLengthError("Символов не достаточно") : setMinLengthError(""): setMinLengthError("");
          break;
        case 'isEmpty':
          value ? setEmpty("") : setEmpty("Введите текст")
          break;
        case 'maxLength':
          value ? value.length > validations[validation] ? setMaxLengthError("Символов слишком много") : setMaxLengthError(""): setMaxLengthError("");
          break;
        case 'email':
          const regExpEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          regExpEmail.test(String(value).toLowerCase()) ? setEmailError("") : setEmailError("Невалидный E-mail");
          break;
        case 'name':
          const regExpName = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
          regExpName.test(String(value).toLowerCase()) ? setNameError("") : setNameError("Невалидное имя");
          break;
        default:
      }
    }
  }, [value])

    React.useEffect(() => {
      if (emailError || maxLengthError || minLengthError || nameError || isEmpty) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    },[emailError, minLengthError, maxLengthError, isEmpty, nameError, isValid])

  return {
    isEmpty,
    emailError,
    minLengthError,
    maxLengthError,
    nameError,
    isValid,
  }
}