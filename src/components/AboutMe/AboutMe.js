import myPhotoPath from "../../images/me.jpg";

function AboutMe() {
  return (
    <div className="aboutMe" id="aboutMe">
      <div className="aboutMe__container">
        <h2 className="aboutMe__header">Студент</h2>
        <div className="aboutMe__two-columns">
          <div className="aboutMe__column">
            <h3 className="aboutMe__subheader">Кирилл</h3>
            <h4 className="aboutMe__description">
              Фронтенд-разработчик, 22 года
            </h4>
            <p className="aboutMe__text">
              Я родился в Волгограде, сейчас живу Москве. Я закончил факультет
              агрономии РГАУ-МСХА. Я люблю играть на гитаре, а ещё увлекаюсь
              футболом. Недавно начал кодить. Хочу найти работу в IT.
            </p>
            <a className="aboutMe__link" href="https://github.com/kiryxa09">
              Github
            </a>
          </div>
          <div className="aboutMe__column">
            <img className="aboutMe__img" src={myPhotoPath} alt="Кирилл" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
