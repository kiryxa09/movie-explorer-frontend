import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function Movies() {
  return(
    <div className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <button
        className="movies__button"
        type="button">
          Ещё
        </button>
      <Footer />
    </div>
  );
}

export default Movies;