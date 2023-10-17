import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import { AppContext } from "../../context/AppContext";
import React from "react";
import Auth from "../Auth/Auth";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [registeredState, setRegistered] = React.useState(false);
  const [moviesRoute, setMoviesRoute] = React.useState(false);
  const [savedMoviesRoute, setSavedMoviesRoute] = React.useState(false);
  const [signinRoute, setSigninRoute] = React.useState(false);
  const [signupRoute, setSignupRoute] = React.useState(false);
  const [mainRoute, setMainRoute] = React.useState(false);
  const [profileRoute, setProfileRoute] = React.useState(false);
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [addedMovies, setAddedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [queryText, setQueryText] = React.useState("");
  const [addedMoviesCounter, setAddedMoviesCounter] = React.useState(JSON.parse(localStorage.getItem('addedMovies')) || 0);
  const [searchParam] = React.useState(["nameRU", "nameEN"]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setISLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const location = useLocation();

  const navigate = useNavigate();
  
  const handleTokenCheck = () => {
    mainApi.checkToken().then((res) => {
      if (res) {
        setCurrentUser(res);
        setRegistered(true);
        navigate("/movies", { replace: true });
        mainApi
          .getMovies()
          .then(res => {
            console.log(res);
            setSavedMovies(res.myMovies)
        })
        .catch(err => {
          console.log(err);
        })
    }
    console.log(savedMovies);
    });
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (addedMoviesCounter) {
      setAddedMovies(movies.slice(0, addedMoviesCounter));
    }
    setChecked(JSON.parse(localStorage.getItem('checkbox')));
    setQueryText(localStorage.getItem('query'));
    console.log(localStorage);
  }, [])

  function useWidth() {
    const [width, setWidth] = React.useState(0);
    React.useLayoutEffect(() => {
      function updateWidth() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
  }

  let width = useWidth();

  const setLocationfalse = () => {
    setMainRoute(false);
    setMoviesRoute(false);
    setSavedMoviesRoute(false);
    setSigninRoute(false);
    setSignupRoute(false);
    setProfileRoute(false);
  };

  React.useEffect(() => {
    if (location.pathname === "/signup") {
      setLocationfalse();
      setSignupRoute(true);
    } else if (location.pathname === "/signin") {
      setLocationfalse();
      setSigninRoute(true);
    } else if (location.pathname === "/movies") {
      setLocationfalse();
      setMoviesRoute(true);
    } else if (location.pathname === "/saved-movies") {
      setLocationfalse();
      setSavedMoviesRoute(true);
    } else if (location.pathname === "/") {
      setLocationfalse();
      setMainRoute(true);
    } else if (location.pathname === "/profile") {
      setLocationfalse();
      setProfileRoute(true);
    }
  }, [location.pathname]);

  function downloadMovies() {
    setISLoading(true);
    moviesApi.getMovies()
      .then(res => {
        setMovies(search(res));
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setISLoading(false);
        localStorage.setItem('addedMovies', parseInt(addedMovies.length));
        console.log(addedMovies);
      })
      if (width>1279) {
        setAddedMovies(movies.slice(0, 12));
      } else if (width>767) {
        setAddedMovies(movies.slice(0, 8));
      } else if (width>1) {
        setAddedMovies(movies.slice(0, 5));
      }
  }

  function addMoreMovies() {
    let firstMovie = addedMovies.length;
    let secondMovie = firstMovie + 1;
    let thirdMovie = firstMovie + 2;
    if (width > 1279 && movies[thirdMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie],  movies[secondMovie], movies[thirdMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length));
    } else if (movies[secondMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie], movies[secondMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length));
    } else if (movies[firstMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length));
    } else {
      console.log("bom bom", movies[thirdMovie]);
    }
    console.log(addedMovies);
  }

  function search(items) {
    return items.filter((item) => {
    if(checked) {
      if(item.duration < 41) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(queryText.toLowerCase()) > -1
                     );
                 });
      }
    } else if (!checked) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(queryText.toLowerCase()) > -1
                     );
                 });
                }
         });
     }

    function searchSavedMovies() {
      mainApi.getMovies()
        .then(res => {
          setSavedMovies(search(res.myMovies));
        })
        .catch(err => {
          console.log(err);
        });
    };

    function deleteMovie(id) {
      mainApi
        .deleteMovie(id)
        .then(() => {
          setSavedMovies((movies) =>
            movies.filter((c) => (c._id !== id ? c : null))
          )})
        .catch(err => {
          console.log(err);
        });
    }

  function saveCard(movie) {
      mainApi
      .postMovie({ country: movie.country, director: movie.director, duration: movie.duration,
        year: movie.year, description: movie.description, image: `https://api.nomoreparties.co/${ movie.image.url }`, trailerLink: movie.trailerLink,
        nameRU: movie.nameRU, nameEN: movie.nameEN, thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`, id: movie.id })
      .then(res => {
        setSavedMovies([...savedMovies, res.movie]);
      })
      .catch(err => {
        console.log(err);
    })
  }

  return (
    <AppContext.Provider
      value={{
        registeredState,
        setRegistered,
        signinRoute,
        signupRoute,
        savedMoviesRoute,
        mainRoute,
        moviesRoute,
        profileRoute,
        movies,
        downloadMovies,
        addedMovies,
        checked,
        setChecked,
        queryText,
        setQueryText,
        addMoreMovies,
        setSavedMovies,
        savedMovies,
        setISLoading,
      }}
    >
    <CurrentUserContext.Provider
      value={currentUser}
      >
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/movies" 
            element={
              <ProtectedRouteElement 
                element={Movies}
                movies={addedMovies}
                onSearch={downloadMovies}
                onDelete={deleteMovie}
                onSave={saveCard}
                />
            } 
            />
          <Route 
            path="/saved-movies" 
            element={
              <ProtectedRouteElement 
                element={SavedMovies}
                movies={savedMovies}
                onSearch={searchSavedMovies}
                onDelete={deleteMovie}
                />
            } />
          <Route 
            path="/profile" 
            element={
              <ProtectedRouteElement 
                element={Profile}
                
                />
            } />
          <Route
            path="/signin"
            element={
              <Auth
                title="Рады видеть!"
                signup={false}
                buttonText="Войти"
                signed="Ещё не зарегистрированы?"
                link="/signup"
                linkText="Регистрация"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Auth
                title="Добро пожаловать"
                signup={true}
                buttonText="Зарегистрироваться"
                signed="Уже зарегистрированы?"
                link="/signin"
                linkText="Войти"
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        )}
        
      </div>
    </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
