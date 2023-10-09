  import movieCardPath from "../../images/pic.jpg";
  import savedIconPath from "../../images/saved.svg"
  import React from "react";
  import { AppContext } from "../../context/AppContext";

  function MoviesCard() {
  const appContext = React.useContext(AppContext);
  const [saved, setSaved] = React.useState(false);
  const handleCardSave = () => {
    setSaved(true);
  }

    return (
      <article className="movies-card">
        {appContext.moviesRoute ? (
        !saved ? (
          <button
          onClick={handleCardSave}
          type="button"
          className="movies-card__button movies-card__button_save"
        >Сохранить</button>
        ) : (
          <img
            src={savedIconPath}
            alt="выбрано"
            className="movies-card__button movies-card__button_saved"
          />
        )
      ) : (
        <button
            type="button"
            className="movies-card__button movies-card__button_delete"
          ></button>
      )}
        <img
          className="movies-card__image"
          src={movieCardPath}
          alt="фильм"
        />
        <div className="movies-card__info">
          <p className="movies-card__title">33 слова о дизайне</p>
          <div className="movies-card__container-duration">
            <p className="movies-card__duration">1ч 17м</p>
          </div>
        </div>
      </article>
    );
  }

  export default MoviesCard;