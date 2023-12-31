import Header from "../Header/Header";
import { Link } from "react-router-dom";
import React from "react";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useForm, useValidation } from "../../hooks/useForm";

function Profile() {
  const appContext = React.useContext(AppContext);
  const input = useForm();
  const emailValidation = useValidation(input.values.email, {isEmpty: "Введите текст", email: ''});
  const nameValidation = useValidation(input.values.name, {isEmpty: "Введите текст", minLength: 2, maxLength: 30, name: ''});
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    input.values.name = currentUser.name;
    input.values.email = currentUser.email;
  }, [currentUser, appContext.profileRoute]);

  const editProfile = () => {
    setSuccess("");
    setEditing(true);
  };

  const exitProfile = (e) => {
    e.preventDefault();
    mainApi
      .signOut()
      .then((res) => {
          appContext.setRegistered(false);
          localStorage.removeItem("checkbox");
          localStorage.removeItem('query');
          localStorage.removeItem('movies');
          appContext.setMovies([]);
          appContext.setSavedMovies([]);
          appContext.setAddedMovies([]);
          appContext.setQueryText("");
          appContext.setChecked(false);
          appContext.setISLoading(true);
          appContext.setISLoading(false);
      })
      .catch((err) => setError("При выходе из профиля произошла ошибка."))
  };

  const clickEditButton = (evt) => {
    evt.preventDefault();
    mainApi.patchProfile(input.values)
    .then(res => {
      currentUser.name = res.user.name;
      currentUser.email = res.user.email;
      setSuccess(true);
      setEditing(false);
    })
    .catch((err) => {
      if(err === "Ошибка: 409") {
        setError("Пользователь с таким email уже существует.")
      } else {
        setError("При обновлении профиля произошла ошибка.")
      }
      setSuccess(false);
    })
  };

  React.useEffect(() => {
    if(currentUser.name === input.values.name & currentUser.email === input.values.email & editing) {
      setError("Введите новые данные");
    } else {
      setError("")
    }
  }, [input.values.email, input.values.name, editing, currentUser.name, currentUser.email])


  return (
    <div className="profile">
      <Header />
      <form className="profile__form" name="profile-form" onSubmit={clickEditButton} noValidate>
        <div className="profile__content">
          <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
          <label htmlFor="profile-name" className="profile__label">
            Имя
            <input
              required
              type="text"
              name="name"
              className="profile__input profile__input_type_name"
              id="profile-name"
              placeholder="Имя"
              disabled={editing ? false : true}
              value={input.values.name ?? ""}
              onChange={input.handleChange}
            />
          </label>
          <span className={
              !nameValidation.isValid 
                ? "profile__edit-error profile__edit-error_active"
                : "profile__edit-error"
              }>
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
            <label htmlFor="profile-email" className="profile__label">
              E-mail
              <input
                required
                id="profile-email"
                type="email"
                name="email"
                className="profile__input profile__input_type_email"
                placeholder="email"
                disabled={editing ? false : true}
                value={input.values.email ?? ""}
                onChange={input.handleChange}
              />
            </label>
            <span className={
              !emailValidation.isValid 
                ? "profile__edit-error profile__edit-error_active"
                : "profile__edit-error"
                }>
              {emailValidation.isEmpty ?
              emailValidation.isEmpty :
              emailValidation.emailError ?
              emailValidation.emailError :
              'Неопознанная ошибка'}
              </span>
              {success && (
                <span className="profile__success">Данные обновлены</span>
            )}
        </div>
      {editing ? (
        <div className="profile__edit-container">
          <span
            className={
              error
                ? "profile__edit-error profile__edit-error_active"
                : "profile__edit-error"
            }
          >
            {error}
          </span>
          <button
            className={
              !emailValidation.isValid || !nameValidation.isValid || error
                ? "profile__save-button profile__save-button_error"
                : "profile__save-button"
            }
            type="submit"
            disabled={!emailValidation.isValid || !nameValidation.isValid || error}
          >
            Сохранить
          </button>
        </div>
      ) : (
        <div className="profile__edit-container">
          <button
            type="button"
            className="profile__edit-button"
            onClick={editProfile}
          >
            Редактировать
          </button>
          <Link className="profile__link" to="/" onClick={exitProfile}>
            <p className="profile__text profile__text_exit">
              Выйти из аккаунта
            </p>
          </Link>
        </div>
      )}
    </form>
  </div>
  );
}

export default Profile;
