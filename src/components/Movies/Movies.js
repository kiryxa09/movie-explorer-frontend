import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from "../../context/AppContext";
import React from "react";

function Movies() {
  const appContext = React.useContext(AppContext);
  const noMovies = () => { 
    if (appContext.addedMovies.length === appContext.movies.length) {
      return true;    
    }
    return false;
  }
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        {!noMovies() && <button className="movies__button" type="button" onClick={appContext.addMoreMovies}>
          Ещё
        </button>}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
