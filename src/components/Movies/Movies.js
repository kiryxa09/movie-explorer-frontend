import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function Movies() {
  return(
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <button
          className="movies__button"
          type="button">
            Ещё
          </button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;