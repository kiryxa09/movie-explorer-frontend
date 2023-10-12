function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__header">Портфолио</h2>
        <a
          className="portfolio__link"
          href="https://github.com/kiryxa09/how-to-learn"
        >
          <p className="portfolio__link-text">Статичный сайт</p>
          <p className="portfolio__link-arrow">↗</p>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/kiryxa09/russian-travel"
        >
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <p className="portfolio__link-arrow">↗</p>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/kiryxa09/react-mesto-api-full-gha"
        >
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <p className="portfolio__link-arrow">↗</p>
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
