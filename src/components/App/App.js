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
  const [movies, setMovies] = React.useState([]);
  const [addedMovies, setAddedMovies] = React.useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [checked, setChecked] = React.useState(false);
  const [savedChecked, setSavedChecked] = React.useState(false);
  const [queryText, setQueryText] = React.useState("");
  const [querySavedText, setQuerySavedText] = React.useState("");
  const [addedMoviesFiltered, setAddedMoviesFiltered] = React.useState([]);
  const [searchParam] = React.useState(["nameRU", "nameEN"]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
  const [isLoading, setISLoading] = React.useState(false);
  const [moviesAreLoading, setMoviesAreLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialised, setInitialised] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  
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
  };

  function addMoreMovies() {
    console.log(1);
    let firstMovie = addedMoviesFiltered.length;
    let secondMovie = firstMovie + 1;
    let thirdMovie = firstMovie + 2;
    if (width > 1279 && addedMovies[thirdMovie]) {
      setAddedMoviesFiltered([ ...addedMoviesFiltered, addedMovies[firstMovie],  addedMovies[secondMovie], addedMovies[thirdMovie] ]);
    } else if (addedMovies[secondMovie]) {
      setAddedMoviesFiltered([ ...addedMoviesFiltered, addedMovies[firstMovie], addedMovies[secondMovie] ]);
    } else if (addedMovies[firstMovie]) {
      setAddedMoviesFiltered([ ...addedMoviesFiltered, addedMovies[firstMovie] ]);
    } else {
      console.log("bom bom", addedMovies[thirdMovie]);
    }
    console.log(addedMovies);
  }

  function search(items) {
    const matches = items.filter((item) => {
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
    console.log(matches);
    if(matches.length === 0){
      setNothingFound(true);
      console.log(1);
    } else {
      setNothingFound(false);
      console.log(2);
    }
    localStorage.setItem('movies', JSON.stringify(matches));
    return matches;
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

    function searchAddedMovies() {
      if(movies.length === 0){
        downloadMovies();
        console.log("searching...")
      }
      setAddedMovies(search(movies));
      console.log(movies);
    }

    function downloadMovies() {
      setMoviesAreLoading(true);
      moviesApi.getMovies()
      .then(res => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMoviesAreLoading(false);
      })
    }  

    function deleteMovie(id) {
      const movieToDelete = savedMoviesFiltered.find(item => item.id === id)
      mainApi
        .deleteMovie(movieToDelete._id)
        .then(() => {
          setSavedMovies((movies) =>
            movies.filter((c) => (c._id !== movieToDelete._id ? c : null))
          )
          setSavedMoviesFiltered((movies) =>
          movies.filter((c) => (c._id !== movieToDelete._id ? c : null))
        );
        })
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
        setSavedMoviesFiltered([...savedMoviesFiltered, res.movie]);
      })
      .catch(err => {
        console.log(err);
    })
  }

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
    handleTokenCheck();
  }, [registeredState]);

  React.useEffect(() => {
    setChecked(JSON.parse(localStorage.getItem('checkbox')));
    setQueryText(localStorage.getItem('query'));
    console.log(localStorage);
  }, [])

  React.useEffect(() => {
    if(movies.length > 0) {
      setAddedMovies(search(movies));
    }
  },[movies])

  React.useEffect(() => {
    if (location.pathname === "/signup") {
      if(registeredState){
        navigate(-1);
      }
      setLocationfalse();
      setSignupRoute(true);
    } else if (location.pathname === "/signin") {
      if(registeredState){
        navigate(-1);
      }
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
  }, [location.pathname, registeredState]);

  React.useEffect(() => {
    if(savedMovies) {
      setSavedMoviesFiltered(searchSaved(savedMovies))
    }
  }, [savedChecked])

  React.useEffect(() => {
    if(checked) {
      setAddedMoviesFiltered(search(addedMovies))
    } else if(!checked) {
      if(addedMovies.length === 0) {
        return;
      } else if (addedMovies.length === addedMoviesFiltered.length) {
          searchAddedMovies()
      } else if (addedMovies.length > addedMoviesFiltered.length){
        setAddedMoviesFiltered(search(addedMovies))
        if (width>1279) {
          setAddedMoviesFiltered(addedMovies.slice(0, 12));
        } else if (width>767) {
          setAddedMoviesFiltered(addedMovies.slice(0, 8));
        } else if (width>1) {
          setAddedMoviesFiltered(addedMovies.slice(0, 5));
        }
      }  
    }
  }, [checked])

  React.useEffect(() => {
    if(addedMovies) {
      setAddedMoviesFiltered(search(addedMovies));
        if (width>1279) {
          setAddedMoviesFiltered(addedMovies.slice(0, 12));
        } else if (width>767) {
          setAddedMoviesFiltered(addedMovies.slice(0, 8));
        } else if (width>1) {
          setAddedMoviesFiltered(addedMovies.slice(0, 5));
        }
      }
  },[addedMovies, initialised])

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
        initialised,
        moviesAreLoading,
        nothingFound,
        addedMoviesFiltered
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
                movies={addedMoviesFiltered}
                onSearch={searchAddedMovies}
                onDelete={deleteMovie}
                onSave={saveCard}
                onMore={addMoreMovies}
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
