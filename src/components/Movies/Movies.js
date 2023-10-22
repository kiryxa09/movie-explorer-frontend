import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from "../../context/AppContext";
import React from "react";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const appContext = React.useContext(AppContext);
  const noMoreMovies = () => { 
    if (appContext.addedMoviesFiltered.length === appContext.addedMovies.length) {
      return true;    
    }
    if(appContext.checked === true) {
      return true;
    }
    return false;
  }

  const noMovies = () => {
    if(appContext.movies.length > 0) {
      if(appContext.nothingFound) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSearch={props.onSearch} />
        {noMovies() && <span className="movies__not-found">Ничего не найдено</span> }
        {appContext.moviesAreLoading ? 
        (<Preloader />) : 
        (<MoviesCardList movies={props.movies} onDelete={props.onDelete} onSave={props.onSave} />)}
        {!noMoreMovies() && <button className="movies__button" type="button" onClick={props.onMore}>
          Ещё
        </button>}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
