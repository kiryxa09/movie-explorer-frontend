import movieCardPath from "../../images/pic.jpg";
import React from "react";
import { AppContext } from "../../context/AppContext";

function MoviesCard() {
  const appContext = React.useContext(AppContext);
  const [saved, setSaved] = React.useState(false);
  const handleCardSave = () => {
    setSaved(!saved);
  };

  return (
    <article className="movies-card">
      {appContext.moviesRoute ? (
        !saved ? (
          <button
            onClick={handleCardSave}
            type="button"
            className="movies-card__button movies-card__button_save"
          >
            Сохранить
          </button>
        ) : (
          <button
            onClick={handleCardSave}
            type="button"
            className="movies-card__button movies-card__button_saved"
          />
        )
      ) : (
        <button
          type="button"
          className="movies-card__button movies-card__button_delete"
        ></button>
      )}
      <img className="movies-card__image" src={movieCardPath} alt="фильм" />
      <div className="movies-card__info">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <div className="movies-card__container-duration">
          <p className="movies-card__duration">1ч 17м</p>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
