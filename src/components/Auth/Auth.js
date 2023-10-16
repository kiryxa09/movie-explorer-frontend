import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Logo from "../Logo/Logo";
import { useForm } from "../../hooks/useForm";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";

function Auth(props) {
  const { values, handleChange, setValues } = useForm({});
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    mainApi
      .authorize({
        password: values.password,
        email: values.email,
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setValues("");
          appContext.setRegistered(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));      
  }

  const handleRegister = (evt) => {
    evt.preventDefault();
    mainApi
      .register({
        password: values.password,
        email: values.email,
        name: values.name
      })
      .then((res) => {
        console.log(res);
        if (res) {
          setValues("");
          navigate("/signin", { replace: true });        }
      })
  }

  return (
    <main className="auth">
      <div className="auth__content">
        <Logo />
        <h1 className="auth__title">{props.title}</h1>
        <form className="auth__form" name="auth-form">
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
                value={values.name ?? ""}
                onChange={handleChange}
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
            value={values.email ?? ""}
            onChange={handleChange}
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
            value={values.password ?? ""}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="auth__button-container">
        <button type="submit" className="auth__button" onClick={appContext.signinRoute ? (handleLogin) : (handleRegister)}>
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
