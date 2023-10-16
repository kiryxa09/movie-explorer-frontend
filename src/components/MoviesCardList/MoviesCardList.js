import { AppContext } from "../../context/AppContext";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";

function MoviesCardList() {
  const appContext = React.useContext(AppContext);

  return (
    <div className="movies-card-list">
      {appContext.moviesRoute ? (appContext.addedMovies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
          />
        ))) :
        (appContext.savedMoviesRoute && appContext.savedMovies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
          />)))}
    </div>
  );
}

export default MoviesCardList;
