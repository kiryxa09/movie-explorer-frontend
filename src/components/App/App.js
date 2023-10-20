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
  const [savedChecked, setSavedChecked] = React.useState(false);
  const [queryText, setQueryText] = React.useState("");
  const [querySavedText, setQuerySavedText] = React.useState("");
  const [addedMoviesCounter, setAddedMoviesCounter] = React.useState(JSON.parse(localStorage.getItem('addedMovies')) || 0);
  const [searchParam] = React.useState(["nameRU", "nameEN"]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
  const [isLoading, setISLoading] = React.useState(false);
  const [moviesAreLoading, setMoviesAreLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialised, setInitialised] = React.useState(false);

  const location = useLocation();

  
  const handleTokenCheck = () => {
    mainApi.checkToken()
      .then((res) => {
      if (res) {
        setCurrentUser(res);
        setRegistered(true);
        mainApi
          .getMovies()
          .then(res => {
            console.log(res);
            setSavedMovies(res.myMovies)
            setSavedMoviesFiltered(res.myMovies)
          })
          .catch(err => {
            console.log(err);
          })
        }})
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setInitialised(true);
      })
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
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
    setMoviesAreLoading(true);
    moviesApi.getMovies()
      .then(res => {
        setMovies(search(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMoviesAreLoading(false);
        setAddedMovies(movies);
        console.log(localStorage)
      })
  }

  React.useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
    if (width>1279) {
      setAddedMoviesCounter(12);
      setAddedMovies(movies.slice(0, addedMoviesCounter));
      localStorage.setItem('addedMovies', (12));
    } else if (width>767) {
      setAddedMoviesCounter(8);
      setAddedMovies(movies.slice(0, addedMoviesCounter));
      localStorage.setItem('addedMovies', (8));
    } else if (width>1) {
      setAddedMoviesCounter(5);
      setAddedMovies(movies.slice(0, addedMoviesCounter));
      localStorage.setItem('addedMovies', (5));
    }
  }, [movies]);

  React.useEffect(() => {
    console.log(addedMoviesCounter);
    if(addedMoviesCounter) {
      setAddedMovies(movies.slice(0, addedMoviesCounter));
    }
  },[addedMoviesCounter])

  React.useEffect(() => {
    if(movies) {
      setAddedMovies(search(movies));
      console.log('check', addedMovies);
      if(!checked){
        if (width>1279) {
          setAddedMoviesCounter(12);
          setAddedMovies(movies.slice(0, addedMoviesCounter));
          localStorage.setItem('addedMovies', (12));
        } else if (width>767) {
          setAddedMoviesCounter(8);
          setAddedMovies(movies.slice(0, addedMoviesCounter));
          localStorage.setItem('addedMovies', (8));
        } else if (width>1) {
          setAddedMoviesCounter(5);
          setAddedMovies(movies.slice(0, addedMoviesCounter));
          localStorage.setItem('addedMovies', (5));
        }
      }
    }
  },[checked, initialised])

  React.useEffect(() => {
    if(savedMovies) {
      setSavedMoviesFiltered(searchSaved(savedMovies))
    }
  }, [savedChecked])

  function addMoreMovies() {
    console.log(1);
    let firstMovie = addedMovies.length;
    let secondMovie = firstMovie + 1;
    let thirdMovie = firstMovie + 2;
    if (width > 1279 && movies[thirdMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie],  movies[secondMovie], movies[thirdMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length + 3));
    } else if (movies[secondMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie], movies[secondMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length + 2));
    } else if (movies[firstMovie]) {
      setAddedMovies([ ...addedMovies, movies[firstMovie] ]);
      localStorage.setItem('addedMovies', parseInt(addedMovies.length + 1));
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

     function searchSaved(items) {
      return items.filter((item) => {
      if(savedChecked) {
        if(item.duration < 41) {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(querySavedText.toLowerCase()) > -1
                       );
                   });
        }
      } else if (!savedChecked) {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(querySavedText.toLowerCase()) > -1
                       );
                   });
                  }
           });
       }

    function searchSavedMovies() {
      setSavedMoviesFiltered(searchSaved(savedMovies));
    };

    function deleteMovie(id) {
      const movieToDelete = savedMovies.find(item => item.id === id)
      mainApi
        .deleteMovie(movieToDelete._id)
        .then(() => {
          setSavedMovies((movies) =>
            movies.filter((c) => (c._id !== movieToDelete._id ? c : null))
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

  

  function setShortMovies() {
    if(movies) {
      setAddedMovies(search(movies));
    }
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
        setMovies,
        downloadMovies,
        setAddedMovies,
        addedMovies,
        checked,
        setChecked,
        savedChecked,
        setSavedChecked,
        queryText,
        setQueryText,
        querySavedText,
        setQuerySavedText,
        setSavedMovies,
        savedMovies,
        setISLoading,
        setAddedMoviesCounter,
        initialised,
        moviesAreLoading,
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
                onMore={addMoreMovies}
                onCheckboxFilter={setShortMovies}
                />
            } 
            />
          <Route 
            path="/saved-movies" 
            element={
              <ProtectedRouteElement 
                element={SavedMovies}
                movies={savedMoviesFiltered}
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
