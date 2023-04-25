import axios from "axios";
import {
  GET_ALL_GAMES,
  GET_GAME_BY_NAME,
  GET_GAME_BY_ID,
  GET_GENRES,
  GET_GENRES_FILTERED,
  GET_GAMES_ORDER_RATING,
  GET_GAMES_ORDER_ALPHABETIC,
  GET_GAMES_FROM_API_OR_DB,
  GET_PLATFORMS,
  FETCHED_ERRORS,
  POST_VIDEOGAME,
} from "./actionsTypes";

// action traer todos los juegos
export const getAllGames = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    const data = response.data;
    dispatch({ type: GET_ALL_GAMES, payload: data });
  };
};

// action traer juegos por nombres
export const getGameByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    const data = response.data;
    return dispatch({ type: GET_GAME_BY_NAME, payload: data });
  } catch (error) {
    dispatch({ type: FETCHED_ERRORS, payload: error.response.data.error });
  }
};

// action traer juegos por id

export const getGameById = (idVideogame) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames/${idVideogame}`
    );
    const data = response.data;
    dispatch({ type: GET_GAME_BY_ID, payload: data });
  };
};

// action traer los generos

export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/genres");
    const data = response.data;
    dispatch({ type: GET_GENRES, payload: data });
  };
};

//action crear video juego
export const postVideogame = (videogame, callback) => {
  return async function (dispatch) {
    await axios
      .post("http://localhost:3001/videogames", videogame)
      .then((response) => {
        dispatch({ type: POST_VIDEOGAME, payload: response.data });
        callback(response.data);
      })
      .catch((error) => {
        console.log("Hubo un error en post videogame:", error);
      });
  };
};

// action traer generos filtrados
export const getGenresFiltered = (genre) => {
  return { type: GET_GENRES_FILTERED, payload: genre };
};

// cation ordenar por rating
export const getGamesOrderRating = (value) => {
  return { type: GET_GAMES_ORDER_RATING, payload: value };
};

// action ordenar alfabeticamente
export const getGamesOrderAlphabetic = (value) => {
  return { type: GET_GAMES_ORDER_ALPHABETIC, payload: value };
};

// action filtrar por origen de api o db
export const getGamesFromApiOrDb = (value) => {
  return { type: GET_GAMES_FROM_API_OR_DB, payload: value };
};

// action para filtrar todas las plataformas
export const getPlatforms = () => {
  return { type: GET_PLATFORMS };
};
