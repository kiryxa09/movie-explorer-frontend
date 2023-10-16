import React from "react";
import { AppContext } from "../../context/AppContext";
import * as mainApi from "../../utils/MainApi";

function MoviesCard(props) {
  const appContext = React.useContext(AppContext);
  const [saved, setSaved] = React.useState(false);
  const handleCardSave = () => {
    mainApi
      .postMovie(props.movie)
      .then(res => {
        setSaved(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
    })
    
  };

  const handleCardDelete = () => {
    mainApi
      .getMovies()
      .then(res => {
        const thisMovie = res.myMovies.find(item => item.id === props.movie.id)
        .deleteMovie(thisMovie._id)
        .then(res => {
          setSaved(false);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
    })
  };

  function minutesToHours (totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    
    return `${(hours)}ч${(minutes)}м`;
  }

  const duration = minutesToHours(props.movie.duration)

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
          type="button"
          className="movies-card__button movies-card__button_delete"
        ></button>
      )}
      <img className="movies-card__image" src={`https://api.nomoreparties.co/${props.movie.image.url}`} alt={props.movie.nameRU} />
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
