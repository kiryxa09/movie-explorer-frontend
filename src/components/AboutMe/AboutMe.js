import myPhotoPath from "../../images/me.jpg";

function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__header">Студент</h2>
        <div className="about-me__two-columns">
          <div className="about-me__column">
            <h3 className="about-me__subheader">Кирилл</h3>
            <h4 className="about-me__description">
              Фронтенд-разработчик, 22 года
            </h4>
            <p className="about-me__text">
              Я родился в Волгограде, сейчас живу Москве. Я закончил факультет
              агрономии РГАУ-МСХА. Я люблю играть на гитаре, а ещё увлекаюсь
              футболом. Недавно начал кодить. Хочу найти работу в IT.
            </p>
            <a className="about-me__link" href="https://github.com/kiryxa09">
              Github
            </a>
          </div>
          <div className="about-me__column">
            <img className="about-me__img" src={myPhotoPath} alt="Кирилл" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
