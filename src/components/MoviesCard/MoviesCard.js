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
    <article className="moviesCard">
      {appContext.moviesRoute ? (
        !saved ? (
          <button
            onClick={handleCardSave}
            type="button"
            className="moviesCard__button moviesCard__button_save"
          >
            Сохранить
          </button>
        ) : (
          <button
            onClick={handleCardSave}
            type="button"
            className="moviesCard__button moviesCard__button_saved"
          />
        )
      ) : (
        <button
          type="button"
          className="moviesCard__button moviesCard__button_delete"
        ></button>
      )}
      <img className="moviesCard__image" src={movieCardPath} alt="фильм" />
      <div className="moviesCard__info">
        <h2 className="moviesCard__title">33 слова о дизайне</h2>
        <div className="moviesCard__container-duration">
          <p className="moviesCard__duration">1ч 17м</p>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
