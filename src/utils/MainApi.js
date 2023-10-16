export const BASE_URL = "https://api.movies.kiryxa09.nomoredomainsrocks.ru";

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ password, email, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    //credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email, name }),
  })
    .then((res) => {
      return checkResponse(res);
    })
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResponse(res))
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkResponse(res))
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => checkResponse(res));
};

export const patchProfile = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  })
    .then((res) => checkResponse(res))
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkResponse(res))
};

export const postMovie = ({country, director, duration,
  year, description, image, trailerLink,
  nameRU, nameEN, thumbnail, movieId}) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country, director, duration,
      year, description, image, trailerLink,
      nameRU, nameEN, thumbnail, movieId }),
  })
    .then((res) => checkResponse(res))
};

export const deleteMovie = ({movieId}) => {
  return fetch(`${this._baseUrl}/movies/${movieId}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return this._checkResponse(res);
  });
};