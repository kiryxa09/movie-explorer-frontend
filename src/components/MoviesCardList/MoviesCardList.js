import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";

function MoviesCardList(props) {

  return (
    <div className="movies-card-list">
      {props.movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
            onDelete={props.onDelete}
            onSave={props.onSave}
          />
          ))}
    </div>
  );
}

export default MoviesCardList;
