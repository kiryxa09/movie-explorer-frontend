import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";

function Login() {
  return(
    <div className="login">
      <img className="login__logo" src={logoPath} alt="логотип" />
      <p className="login__title">Рады видеть!</p>
      <form className="login__form">
        <p className="login__label">E-mail</p>
        <input
          className="login__input login__input_email"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <p className="login__label">Пароль</p>
        <input
          className="login__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
      <p className="login__signup">
        Еще не зарегистрированы?
        <Link to="/signup" className="login__link">
          {" "}
          Регистрация
        </Link>
      </p>
    </div> 
  );
}

export default Login;