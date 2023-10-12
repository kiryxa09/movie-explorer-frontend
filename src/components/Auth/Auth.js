import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";


function Auth(props) {
  return(
    <main className="auth">
      <div className="auth__content">
        <Logo />
        <h1 className="auth__title">{props.title}</h1>
        <form className="auth__form" name="auth-form">
          {props.signup && 
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
            />
          </>
          }
          <p className="auth__label">E-mail</p>
          <input
            className="auth__input auth__input_type_email"
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
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
          />
        </form>
      </div>
      <div className="auth__button-container">
      <button type="submit" className="auth__button">
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