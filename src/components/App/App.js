import { Route, Routes, useLocation } from "react-router-dom";
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
import Preloader from "../Preloader/Preloader"

function App() {
  const [registeredState, setRegistered] = React.useState(false);
  const [moviesRoute, setMoviesRoute] = React.useState(false);
  const [savedMoviesRoute, setSavedMoviesRoute] = React.useState(false);
  const [signinRoute, setSigninRoute] = React.useState(false);
  const [signupRoute, setSignupRoute] = React.useState(false);
  const [mainRoute, setMainRoute] = React.useState(false);
  const [profileRoute, setProfileRoute] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [addedMovies, setAddedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [queryText, setQueryText] = React.useState("");
  const [addedMoviesCounter, setAddedMoviesCounter] = React.useState(0);
  const [searchParam] = React.useState(["nameRU", "nameEN"]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setISLoading] = React.useState(false);

  const location = useLocation();
  
  const handleTokenCheck = () => {
    mainApi.checkToken().then((res) => {
      if (res) { 
        setRegistered(true);
      }
    })
    .catch(err => {
        console.log(err);
    })
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    console.log((JSON.parse(localStorage.getItem('movies'))));
    const arrMovie = JSON.parse(localStorage.getItem('movies'));
    if(arrMovie) {
      setMovies(arrMovie);
      console.log("boo");
      console.log(movies);
    }
    setAddedMoviesCounter(JSON.parse(localStorage.getItem('addedMovies')));
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

  React.useEffect(() => {
    if (registeredState) {
      mainApi
      .getMovies(res => {
        setSavedMovies(res.myMovies)
      })
      .catch(err => {
        console.log(err);
      }) 
    }
  }, [registeredState]);

  

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
        if (width>1279) {
          setAddedMovies(movies.slice(0, 12));
          
        } else if (width>767) {
          setAddedMovies(movies.slice(0, 8));
          localStorage.setItem('addedMovies', parseInt(addedMovies.length));
        } else if (width>1) {
          setAddedMovies(movies.slice(0, 5));
          localStorage.setItem('addedMovies', parseInt(addedMovies.length));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setISLoading(false);
        localStorage.setItem('addedMovies', parseInt(addedMovies.length));
        console.log(addedMovies);
      })
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
        savedMovies,
        setISLoading,
      }}
    >
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
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
    </AppContext.Provider>
  );
}

export default App;
