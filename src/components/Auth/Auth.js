import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/useForm";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Auth(props) {
  const validation = useFormWithValidation();
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation.values.email || !validation.values.password) {
      return;
    }

    appContext.setISLoading(true);

    mainApi
      .authorize({
        password: validation.values.password,
        email: validation.values.email,
      })
      .then((data) => {
        if (data) {
          console.log(data);
          validation.resetForm("")
          appContext.setRegistered(true);
          currentUser.name = validation.values.name;
          currentUser.email = validation.values.email;
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        appContext.setISLoading(false);
      })      
  }

  const handleRegister = (evt) => {
    evt.preventDefault();
    appContext.setISLoading(true);
    mainApi
      .register({
        password: validation.values.password,
        email: validation.values.email,
        name: validation.values.name
      })
      .then((res) => {
        console.log(res);
        if (res) {
          validation.setValues("");
          navigate("/signin", { replace: true });        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        appContext.setISLoading(false);
      })    
  }

  return (
    <main className="auth">
      <div className="auth__content">
        <Logo />
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
                minLength={2}
                maxLength={30}
                value={validation.values.name ?? ""}
                onChange={validation.handleChange}
                onError={validation.errors}
                pattern="^[-а-яА-ЯёЁa-zA-Z\s]+$"
              />
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
            value={validation.values.email ?? ""}
            onChange={validation.handleChange}
            onError={validation.errors}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <p className="auth__label">Пароль</p>
          <input
            className="auth__input auth__input_type_password"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength={2}
            maxLength={30}
            value={validation.values.password ?? ""}
            onChange={validation.handleChange}
            onError={validation.errors}
          />
        </form>
        <span className={validation.isValid ? ("auth__error") : ("auth__error auth__error_active")}>{validation.errors.name || validation.errors.email || validation.errors.password}</span>
      </div>
      <div className="auth__button-container">
        <button type="submit" disabled={validation.isValid ? (false) : (true)} className={validation.isValid ? ("auth__button") : ("auth__button auth__button_error")}  onClick={appContext.signinRoute ? (handleLogin) : (handleRegister)}>
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
