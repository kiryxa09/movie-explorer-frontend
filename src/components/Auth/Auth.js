import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Logo from "../Logo/Logo";
import { useForm, useValidation } from "../../hooks/useForm";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Auth(props) {
  const input = useForm();
  const emailValidation = useValidation(input.values.email, {isEmpty: "Введите текст", email: input.values.email});
  const nameValidation = useValidation(input.values.name, {isEmpty: "Введите текст", minLength: 2, maxLength: 30, name: input.values.name});
  const passwordValidation = useValidation(input.values.password, {isEmpty: "Введите текст", minLength: 2, maxLength: 30})
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!input.values.email || !input.values.password) {
      return;
    }

    appContext.setISLoading(true);

    mainApi
      .authorize({
        password: input.values.password,
        email: input.values.email,
      })
      .then((data) => {
        if (data) {
          console.log(data);
          input.setValues("")
          appContext.setRegistered(true);
          currentUser.name = data.name;
          currentUser.email = data.email;
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        appContext.setISLoading(false);
        navigate("/movies", { replace: true });
      })      
  }

  const handleRegister = (evt) => {
    evt.preventDefault();
    appContext.setISLoading(true);
    mainApi
      .register({
        password: input.values.password,
        email: input.values.email,
        name: input.values.name
      })
      .then((res) => {
        if (res) {
          mainApi
            .authorize({
              password: input.values.password,
              email: input.values.email,
            })
            .then(() => {
              input.setValues("")
              appContext.setRegistered(true);
              currentUser.name = input.values.name;
              currentUser.email = input.values.email;
            })
            .catch((err) => console.log(err.message)) 
            .finally(() => {
              navigate("/movies", { replace: true });
            })
        } 
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        appContext.setISLoading(false);
      })
  }

  return (
    <main className="auth">
      <div className="auth__content">
        <Link to="/">
          <Logo />
        </Link>
        <h1 className="auth__title">{props.title}</h1>
        <form className="auth__form" name="auth-form" noValidate>
          {props.signup && (
            <>
              <p className="auth__label">Имя</p>
              <input
                className="auth__input auth__input_type_name"
                required
                id="name"
                name="name"
                type="text"
                placeholder="Имя"
                value={input.values.name ?? ""}
                onChange={input.handleChange}
              />
              <span className={!nameValidation.isValid ? ("auth__error auth__error_active") : ("auth__error")}>
                {nameValidation.isEmpty ? 
                nameValidation.isEmpty : 
                nameValidation.minLengthError ? 
                nameValidation.minLengthError : 
                nameValidation.nameError ?
                nameValidation.nameError :
                nameValidation.maxLengthError ?
                nameValidation.maxLengthError : 
                'Неопознанная ошибка'}
              </span>
            </>
          )}
          <p className="auth__label">E-mail</p>
          <input
            className="auth__input auth__input_type_email"
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={input.values.email ?? ""}
            onChange={input.handleChange}
          />
          <span className={!emailValidation.isValid ? ("auth__error auth__error_active") : ("auth__error")}>
            {emailValidation.isEmpty ?
            emailValidation.isEmpty :
            emailValidation.emailError ?
            emailValidation.emailError :
            'Неопознанная ошибка'}
            </span>
          <p className="auth__label">Пароль</p>
          <input
            className="auth__input auth__input_type_password"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={input.values.password ?? ""}
            onChange={input.handleChange}
          />
          <span className={!passwordValidation.isValid ? ("auth__error auth__error_active") : ("auth__error")}>
            {passwordValidation.isEmpty ?
            passwordValidation.isEmpty :
            passwordValidation.minLengthError ? 
            passwordValidation.minLengthError : 
            passwordValidation.maxLengthError ?
            passwordValidation.maxLengthError :
            'Неопознанная ошибка'}
            </span>
        </form>
      </div>
      <div className="auth__button-container">
        <button 
          type="submit" 
          disabled={!emailValidation.isValid || (props.signup && !nameValidation.isValid) || !passwordValidation.isValid  } 
          className={emailValidation.isValid || (props.signup && nameValidation.isValid) || passwordValidation.isValid ? ("auth__button") : ("auth__button auth__button_error")}  onClick={appContext.signinRoute ? (handleLogin) : (handleRegister)}>
          {props.buttonText}
        </button>
        <p className="auth__signup">
          {props.signed}
          <Link to={props.link} className="auth__link">
            {" "}
            {props.linkText}
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Auth;
