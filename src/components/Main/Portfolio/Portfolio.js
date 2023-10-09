import arrowImagePath from "../../../images/arrow.svg";

function Portfolio() {
  return(
    <div className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__header">Портфолио</h2>
        <a className="portfolio__link" href="https://github.com/kiryxa09/how-to-learn">
          <p className="portfolio__link-text">Статичный сайт</p>
          <img className="portfolio__link-arrow" src={arrowImagePath} alt="стрелочка" />
        </a>
        <a className="portfolio__link" href="https://github.com/kiryxa09/russian-travel">
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <img className="portfolio__link-arrow" src={arrowImagePath} alt="стрелочка" />
        </a>
        <a className="portfolio__link" href="https://github.com/kiryxa09/react-mesto-api-full-gha">
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <img className="portfolio__link-arrow" src={arrowImagePath} alt="стрелочка" />
        </a>
      </div>
    </div>
  );
}

export default Portfolio;