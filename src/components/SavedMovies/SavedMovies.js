import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function SavedMovies(props) {
  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSearch={props.onSearch} />
        <MoviesCardList movies={props.movies} onDelete={props.onDelete} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
