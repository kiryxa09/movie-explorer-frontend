import Header from "../Header/Header";
import { Link } from "react-router-dom";
import React from "react";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";
import { useForm } from "../../hooks/useForm";



function Profile() {
  const appContext = React.useContext(AppContext);
  const { values, handleChange, setValues } = useForm({});
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState(false);

  const editProfile = () => {
    setEditing(true);
  };

  const exitProfile = () => {
    mainApi
      .signOut()
      .then((res) => {
        if (res) {
          appContext.setRegistered(false);
        }
      })
  };

  const clickEditButton = () => {
    mainApi.patchProfile(values)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile__content">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <form className="profile__form" name="profile-form">
          <label htmlFor="profile-name" className="profile__label">
            Имя
            <input
              type="text"
              name="name"
              className="profile__input profile__input_type_name"
              id="profile-name"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              disabled={editing ? false : true}
              value={values.name ?? ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="profile-email" className="profile__label">
            E-mail
            <input
              id="profile-email"
              type="email"
              name="email"
              className="profile__input profile__input_type_email"
              placeholder="email"
              minLength={2}
              maxLength={30}
              disabled={editing ? false : true}
              value={values.email ?? ""}
              onChange={handleChange}
            />
          </label>
        </form>
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
            При обновлении профиля произошла ошибка.
          </span>
          <button
            className={
              error
                ? "profile__save-button profile__save-button_error"
                : "profile__save-button"
            }
            type="button"
            disabled={error ? true : false}
            onClick={clickEditButton}
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
    </div>
  );
}

export default Profile;
