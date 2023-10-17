import { AppContext } from "../../context/AppContext";
import React from "react";

function SearchForm(props) {
  const appContext = React.useContext(AppContext);
  const [error, setError] = React.useState(false);

  const setMovies = (e) => {
    if (appContext.queryText) {
      e.preventDefault();
      props.onSearch();
    } else {
      setError(true);
    }
  }

  const setSavedMovies = (e) => {
    e.preventDefault();
    props.onSearch();
  }

  function handleChangeText(e) {
    appContext.setQueryText(e.target.value);
    setError(false);
    localStorage.setItem('query', e.target.value);
  }

  function handleChangebox(e) {
    appContext.setChecked(e.target.checked);
    localStorage.setItem('checkbox' , JSON.stringify(e.target.checked));
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
            onChange={handleChangeText}
          />
          <button className="search__button" type="button" onClick={appContext.moviesRoute ? (setMovies) : (setSavedMovies)}>
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
              onChange={handleChangebox}
            />
            <span className="search__tumb-visible" />
            Короткометражки
          </label>
        </div>
      </form>
      {error && <span className="search__error">Нужно ввести ключевое слово</span>}
    </div>
  );
}

export default SearchForm;
