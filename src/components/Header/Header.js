import Logo from "../Logo/Logo";
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Header(props) {
  const appContext = React.useContext(AppContext);
  const [menuState, setMenuState] = React.useState(false);

  const handleMenuClick = () => {
    setMenuState(!menuState);
  };

  return (
    <header
      className={appContext.mainRoute ? "header header_theme_pink" : "header"}
    >
      <nav className="header__container">
        <Link to="/" className="header__link">
          <Logo />
        </Link>
        {!appContext.registeredState ? (
          <div className="header__links-registration">
            <Link to="/signup" className="header__link">
              <p className="header__link-text header__link-text_reg">
                Регистрация
              </p>
            </Link>
            <Link to="/signin" className="header__link">
              <div className="header__login-button">
                <p className="header__link-text header__link-text_login">
                  Войти
                </p>
              </div>
            </Link>
          </div>
        ) : menuState ? (
          <div className="header__links-mobile">
            <div className="header__mobile-content">
              <button
                type="button"
                className="header__close-button"
                onClick={handleMenuClick}
              />
              <Link to="/" className="header__link">
                <p
                  className={
                    appContext.mainRoute
                      ? "header__link-text header__link-text_underline"
                      : "header__link-text"
                  }
                >
                  Главная
                </p>
              </Link>
              <Link to="/movies" className="header__link">
                <p
                  className={
                    appContext.moviesRoute
                      ? "header__link-text header__link-text_underline"
                      : "header__link-text"
                  }
                >
                  Фильмы
                </p>
              </Link>
              <Link to="/saved-movies" className="header__link">
                <p
                  className={
                    appContext.savedMoviesRoute
                      ? "header__link-text header__link-text_underline"
                      : "header__link-text"
                  }
                >
                  Сохраненные фильмы
                </p>
              </Link>
            </div>
            <div className="header__profile-links">
              <Link to="/profile" className="header__link header__profile-link">
                <p
                  className={
                    appContext.profileRoute
                      ? "header__link-text header__link-text_profile header__link-text_underline"
                      : "header__link-text header__link-text_profile"
                  }
                >
                  Аккаунт
                </p>
                <div className="header__profile-button header__profile-button_white"></div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="header__menu"
              onClick={handleMenuClick}
            />
            <div className="header__links">
              <Link to="/movies" className="header__link">
                <p
                  className={
                    appContext.moviesRoute
                      ? "header__link-text header__link-text_bold"
                      : "header__link-text"
                  }
                >
                  Фильмы
                </p>
              </Link>
              <Link to="/saved-movies" className="header__link">
                <p
                  className={
                    appContext.savedMoviesRoute
                      ? "header__link-text header__link-text_bold"
                      : "header__link-text"
                  }
                >
                  Сохраненные фильмы
                </p>
              </Link>
              <div className="header__profile-links">
                <Link
                  to="/profile"
                  className="header__link header__profile-link"
                >
                  <p
                    className={
                      appContext.profileRoute
                        ? "header__link-text header__link-text_bold"
                        : "header__link-text"
                    }
                  >
                    Аккаунт
                  </p>
                  <div
                    className={
                      !appContext.mainRoute
                        ? "header__profile-button header__profile-button_white"
                        : "header__profile-button"
                    }
                  ></div>
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
