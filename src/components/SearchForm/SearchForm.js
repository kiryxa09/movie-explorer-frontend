import { AppContext } from "../../context/AppContext";
import React from "react";

function SearchForm(props) {
  const appContext = React.useContext(AppContext);
  const [error, setError] = React.useState(false);

  const setMovies = (e) => {
    e.preventDefault();
    if (appContext.queryText) {
      props.onSearch();
    } else {
      setError(true);
    }
  }

  const handleChangeSavedText = (e) => {
    appContext.setQuerySavedText(e.target.value);
  }

  const handleChangeText = (e) => {
    appContext.setQueryText(e.target.value);
    localStorage.setItem('query', e.target.value);
    setError(false)
  }

  const handleChangeCheckbox = (e) => {
    appContext.setChecked(e.target.checked);
    localStorage.setItem('checkbox' , JSON.stringify(e.target.checked));
  }

  const handleChangeSavedCheckbox = (e) => {
    appContext.setSavedChecked(e.target.checked);
  }

  const setSavedMovies = (e) => {
    e.preventDefault();
    props.onSearch();
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={appContext.moviesRoute ? (setMovies) : (setSavedMovies)} noValidate>
        <div className="search__finder">
          <input
            className="search__input"
            required
            id="search"
            name="search"
            type="text"
            placeholder="Фильм"
            value={appContext.moviesRoute ? (appContext.queryText) : (appContext.querySavedText)}
            onChange={appContext.moviesRoute ? (handleChangeText) : (handleChangeSavedText)}
          />
          <button className="search__button" type="submit">
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
              checked={appContext.moviesRoute ? (appContext.checked) : (appContext.savedChecked)}
              onChange={appContext.moviesRoute ? (handleChangeCheckbox) : (handleChangeSavedCheckbox)}
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
