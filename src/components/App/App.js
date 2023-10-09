import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import { AppContext } from "../../context/AppContext";
import React from 'react';

function App() {
  const [registeredState, setRegisteredState] = React.useState(true);
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
            <Route path="/signin" element={<Login />} />
            <Route
              path="/signup"
              element={<Register />}
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
