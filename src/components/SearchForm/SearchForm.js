import { AppContext } from "../../context/AppContext";
import React from "react";

function SearchForm() {
  const appContext = React.useContext(AppContext);
  const setMovies = (e) => {
    e.preventDefault();
    appContext.downloadMovies();
  }

  return (
    <div className="search">
      <form className="search__form">
        <div className="search__finder">
          <input
            className="search__input"
            required
            id="search"
            name="search"
            type="text"
            placeholder="Фильм"
            value={appContext.queryText}
            onChange={e => appContext.setQueryText(e.target.value)}
          />
          <button className="search__button" type="button" onClick={setMovies}>
            Найти
          </button>
        </div>
        <div className="search__shorties">
          <label className="search__checkbox-label">
            <input
              className="search__tumb"
              type="checkbox"
              id="tumb"
              name="tumb"
              checked={appContext.checked}
              onChange={e => appContext.setChecked(e.target.checked)}
            />
            <span className="search__tumb-visible" />
            Короткометражки
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
