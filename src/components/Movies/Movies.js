import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from "../../context/AppContext";
import React from "react";

function Movies(props) {
  const appContext = React.useContext(AppContext);
  const noMovies = () => { 
    if (appContext.addedMovies.length === appContext.movies.length) {
      return true;    
    }
    return false;
  }
  React.useEffect(() => {
    props.movies && localStorage.setItem('addedMovies', (props.movies.length));
  },[props.movies])
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSearch={props.onSearch} />
        <MoviesCardList movies={props.movies} onDelete={props.onDelete} onSave={props.onSave} />
        {!noMovies() && <button className="movies__button" type="button" onClick={props.onMore}>
          Ещё
        </button>}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
