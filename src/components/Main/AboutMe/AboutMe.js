import myPhotoPath from "../../../images/me.jpg";

function AboutMe() {
  return(
    <div className="aboutme" id="aboutme">
      <div className="aboutme__container">
        <div className="aboutme__header-container">
          <h2 className="aboutme__header">Студент</h2>
        </div>
        <div className="aboutme__two-columns">
          <div className="aboutme__column">
            <h3 className="aboutme__subheader">Кирилл</h3>
            <h4 className="aboutme__prof">Фронтенд-разработчик, 22 года</h4>
            <p className="aboutme__text">Я родился в Волгограде, сейчас живу  Москве. Я закончил факультет агрономии РГАУ-МСХА. Я люблю играть на гитаре, а ещё увлекаюсь футболом. Недавно начал кодить. Хочу найти работу в IT.</p>
            <a className="aboutme__link" href="https://github.com/kiryxa09">Github</a>
          </div>
          <div className="aboutme__column">
            <img className="aboutme__img" src={myPhotoPath} alt="Кирилл" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;