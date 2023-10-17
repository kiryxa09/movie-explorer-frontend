import Header from "../Header/Header";
import { Link } from "react-router-dom";
import React from "react";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile() {
  const appContext = React.useContext(AppContext);
  const validation = useFormWithValidation();
  const [editing, setEditing] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    validation.values.name = currentUser.name;
    validation.values.email = currentUser.email;
  }, [currentUser, appContext.profileRoute]);

  const editProfile = () => {
    setEditing(true);
  };

  const exitProfile = () => {
    appContext.setISLoading(true);
    mainApi
      .signOut()
      .then((res) => {
        if (res) {
          appContext.setRegistered(false);
          localStorage.removeItem("checkbox");
          localStorage.removeItem('query');
          localStorage.removeItem('movies');
          localStorage.removeItem('addedMovies');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
       appContext.setISLoading(false)
      })
  };

  const clickEditButton = () => {
    appContext.setISLoading(true);
    mainApi.patchProfile(validation.values)
    .then(res => {
      console.log(res)
      currentUser.name = res.user.name;
      currentUser.email = res.user.email;
      setEditing(false);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      appContext.setISLoading(false)
    })
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile__content">
        <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form" name="profile-form" noValidate>
          <label htmlFor="profile-name" className="profile__label">
            Имя
            <input
              required
              type="text"
              name="name"
              className="profile__input profile__input_type_name"
              id="profile-name"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              disabled={editing ? false : true}
              value={validation.values.name ?? ""}
              onChange={validation.handleChange}
              onError={validation.errors.name}
              pattern="/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u"
            />
          </label>
          <label htmlFor="profile-email" className="profile__label">
            E-mail
            <input
              required
              id="profile-email"
              type="email"
              name="email"
              className="profile__input profile__input_type_email"
              placeholder="email"
              minLength={2}
              maxLength={30}
              disabled={editing ? false : true}
              value={validation.values.email ?? ""}
              onChange={validation.handleChange}
              onError={validation.errors.email}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+/"
            />
          </label>
        </form>
        
      </div>
      {editing ? (
        <div className="profile__edit-container">
          <span
            className={
              validation.errors.name || validation.errors.email
                ? "profile__edit-error profile__edit-error_active"
                : "profile__edit-error"
            }
          >
            {validation.errors.name || validation.errors.email}
          </span>
          <button
            className={
              validation.errors.name || validation.errors.email
                ? "profile__save-button profile__save-button_error"
                : "profile__save-button"
            }
            type="button"
            disabled={validation.errors.name || validation.errors.email ? true : false}
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
