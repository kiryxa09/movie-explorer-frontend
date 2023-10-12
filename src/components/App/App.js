import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import { AppContext } from "../../context/AppContext";
import React from 'react';
import Auth from '../Auth/Auth';

function App() {
  const [registeredState, setRegistered] = React.useState(true);
  const [moviesRoute, setMoviesRoute] = React.useState(false)
  const [savedMoviesRoute, setSavedMoviesRoute] = React.useState(false)
  const [signinRoute, setSigninRoute] = React.useState(false)
  const [signupRoute, setSignupRoute] = React.useState(false)
  const [mainRoute, setMainRoute] = React.useState(false)
  const [profileRoute, setProfileRoute] = React.useState(false)

  const location = useLocation();
 
  const setLocationfalse = () => {
    setMainRoute(false);
    setMoviesRoute(false);
    setSavedMoviesRoute(false);
    setSigninRoute(false);
    setSignupRoute(false);
    setProfileRoute(false);
  }

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
        profileRoute
      }}
    >
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={<Main />}
            />
            <Route
              path="/movies"
              element={<Movies />}
            />
            <Route
              path="/saved-movies"
              element={<SavedMovies />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route 
              path="/signin" 
              element={<Auth title="Рады видеть!" signup={false} buttonText="Войти" signed="Ещё не зарегистрированы?" link="/signup" linkText="Регистрация" />}
            />
              <Route
              path="/signup"
              element={<Auth title="Добро пожаловать" signup={true} buttonText="Зарегистрироваться" signed="Уже зарегистрированы?" link="/signin" linkText="Войти" />}
            />
            <Route
              path="/*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </AppContext.Provider>
  );
}

export default App;
