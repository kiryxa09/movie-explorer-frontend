import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";

function Register() {
  return(
    <div className="register">
      <img className="register__logo" src={logoPath} alt="логотип" />
      <p className="register__title">Добро пожаловать!</p>
      <form className="register__form">
      <p className="register__label">Имя</p>
      <input
          className="register__input"
          required
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
        />
        <p className="register__label">E-mail</p>
        <input
          className="register__input register__input_email"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <p className="register__label">Пароль</p>
        <input
          className="register__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__signup">
        Уже зарегистрированы?
        <Link to="/signin" className="register__link">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;