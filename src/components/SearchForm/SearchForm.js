import findIconPath from "../../images/findIcon.svg";

function SearchForm() {
  
  
  return(
    <div className="search">
      <form className="search__form">
          <div className="search__finder">
          <img className="search__img" src={findIconPath} alt="поиск" />
          <input
            className="search__input"
            required
            id="search"
            name="search"
            type="text"
            placeholder="Фильм"
          />
          <button
            className="search__button"
            type="button"
          >Найти</button>
        </div>
        <div className="search__shorties">
          <label className="search__checkbox-label">
            <input 
              className="search__tumb"
              type="checkbox"
            / >
            <span className="search__tumb-visible" />
            Короткометражки
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;