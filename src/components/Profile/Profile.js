import Header from "../Header/Header";


function Profile() {
  return(
    <>
    <Header />
      <div className="profile">
        <p className="profile__header">Привет, Виталий!</p>
        <form className="profile__form profile__form_name">
          <p className="profile__form__title">Имя</p>
          <input
            type="text"
            className="profile__input profile__input_name"
            placeholder="Имя"
          />
        </form>
        <form className="profile__form profile__form_email">
          <p className="profile__form__title">E-mail</p>
          <input
            type="email"
            className="profile__input profile__input_email"
            placeholder="email"
          />
        </form>
        <p className="profile__text profile__text_edit">Редактировать</p>
        <p className="profile__text profile__text_exit">Выйти из аккаунта</p>
      </div>
    </>
  );
}

export default Profile;