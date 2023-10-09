import logoPath from "../../images/logo.svg";
import profileIconPath from "../../images/icon_acc.svg";
import profileIconBlackPath from "../../images/icon_acc_black.svg";
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
    <header className={appContext.mainRoute ? ("header header_theme_pink") : ("header")}>
      <div className="header__container">
        <img className="header__logo" src={logoPath} alt="лого" />
          {!appContext.registeredState ? (
            <div className="header__links-registration">
              <Link 
                to="/signup" 
                className="header__link">
                <p className="header__link__text header__link__text_reg">Регистрация</p>
              </Link>
              <Link
                to="/signin"
                className="header__link"
              >
                <div className="header__login-button">
                  <p className="header__link__text_login">Войти</p>
                </div>
              </Link>
            </div>
          ) : (
            menuState ? (
              <div className="header__links-mobile">
                <div className="header__overlay" />
                <button type="button" className="header__close-button" onClick={handleMenuClick} />
                <Link 
                  to="/" 
                  className="header__link">
                  <p className={appContext.mainRoute ? ("header__link__text header__link__text_underline") : ("header__link__text")} >Главная</p>
                </Link>
                <Link 
                  to="/movies" 
                  className="header__link">
                  <p className={appContext.moviesRoute ? ("header__link__text header__link__text_underline") : ("header__link__text")}>Фильмы</p>
                </Link>
              <Link
                to="/saved-movies"
                className="header__link"
              >
                <p className={appContext.savedMoviesRoute ? ("header__link__text header__link__text_underline") : ("header__link__text")}>Сохраненные фильмы</p>
              </Link>
              <div className="header__profile-links">
                <Link
                  to="/profile"
                  className="header__link header__profile-link"
                >
                  <p className={appContext.profileRoute ? ("header__link__text header__link__text_profile header__link__text_underline") : ("header__link__text header__link__text_profile")}>Аккаунт</p>
                  <div className="header__profile-button header__profile-button_white">
                    <img className="header__profile-icon" alt="аккаунт" src={profileIconBlackPath}  />
                  </div>
                </Link>
              </div>
              </div>) : 
              (
              <button type="button" className="header__menu" onClick={handleMenuClick} />
            ))} 
            <div className="header__links">
            <Link 
              to="/movies" 
              className="header__link">
              <p className={appContext.moviesRoute ? ("header__link__text header__link__text_bold") : ("header__link__text")}>Фильмы</p>
            </Link>
          <Link
            to="/saved-movies"
            className="header__link"
          >
            <p className={appContext.savedMoviesRoute ? ("header__link__text header__link__text_bold") : ("header__link__text")}>Сохраненные фильмы</p>
          </Link>
          <div className="header__profile-links">
            <Link
              to="/profile"
              className="header__link header__profile-link"
            >
              <p className={appContext.profileRoute ? ("header__link__text header__link__text_bold") : ("header__link__text")}>Аккаунт</p>
              <div className={!appContext.mainRoute ? ("header__profile-button header__profile-button_white") : ("header__profile-button")}>
                <img className="header__profile-icon" src={!appContext.mainRoute ? (profileIconBlackPath) : (profileIconPath)} alt="аккаунт" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;