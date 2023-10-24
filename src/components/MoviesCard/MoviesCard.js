import React from "react";
import { AppContext } from "../../context/AppContext";

function MoviesCard(props) {
  const appContext = React.useContext(AppContext);
  const [saved, setSaved] = React.useState(false);
  const savedMovieImage = props.movie.image;
  const handleCardSave = () => {
    props.onSave(props.movie);
    setSaved(true);
  };

  const handleCardDelete = () => {
    props.onDelete(props.movie.id);
    setSaved(false);
  };

  function minutesToHours (totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    
    return `${(hours)}ч${(minutes)}м`;
  }

  const duration = minutesToHours(props.movie.duration)

  React.useEffect(() => {
    if(appContext.savedMovies.find(item => item.id === props.movie.id)) {
      setSaved(true);
    }
  }, [appContext.moviesRoute, appContext.savedMovies])

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
            onClick={handleCardDelete}
            type="button"
            className="movies-card__button movies-card__button_saved"
          />
        )
      ) : (
        <button
          onClick={handleCardDelete}
          type="button"
          className="movies-card__button movies-card__button_delete"
        ></button>
      )}
      <a className="movies-card__trailer-link" rel="noreferrer" href={props.movie.trailerLink} target="_blank">
      <img className="movies-card__image" src={appContext.moviesRoute ? (`https://api.nomoreparties.co/${ props.movie.image.url }`) : (savedMovieImage)} alt={props.movie.nameRU} />
      </a>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{props.movie.nameRU}</h2>
        <div className="movies-card__container-duration">
          <p className="movies-card__duration">{duration}</p>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
