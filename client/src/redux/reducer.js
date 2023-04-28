import {
  GET_ALL_GAMES,
  GET_GAMES_ORDER_ALPHABETIC,
  GET_GAMES_ORDER_RATING,
  GET_GAME_BY_ID,
  GET_GAME_BY_NAME,
  GET_GENRES,
  GET_GENRES_FILTERED,
  GET_GAMES_FROM_API_OR_DB,
  
} from "./actionsTypes";

const initialState = {
  allGames: [],
  allGamesToFilter: [],
  gameDetail: [],
  genres: [],
  ApiOrDb: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allGamesToFilter: action.payload,
      };

    case GET_GAME_BY_NAME:
      return {
        ...state,
        allGames: action.payload,
        allGamesToFilter: action.payload,
      };

    case GET_GAME_BY_ID:
      return {
        ...state,
        gameDetail: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    // -----------------------------------------FILTROS-------------------------------------------------------------------(Arriba ya esta todo filtrado en el back)
    case GET_GENRES_FILTERED:
      return {
        ...state,
        allGames:
          state.ApiOrDb === ""
            ? [
                ...state.allGamesToFilter.filter((game) =>
                  game.genres.includes(action.payload)
                ),
              ]
            : state.ApiOrDb === "API"
            ? [
                ...state.allGamesToFilter.filter(
                  (game) =>
                    !isNaN(game.id) && game.genres.includes(action.payload)
                ),
              ]
            : [
                ...state.allGamesToFilter.filter(
                  (game) =>
                    isNaN(game.id) && game.genres.includes(action.payload)
                ),
              ],
      };
    // Ordenar por rating
    case GET_GAMES_ORDER_RATING:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          allGames: [...state.allGames.sort((a, b) => a.rating - b.rating)],
        };
      } else {
        return {
          ...state,
          allGames: [...state.allGames.sort((a, b) => b.rating - a.rating)],
        };
      }
    // Ordenar alfabeticamente
    case GET_GAMES_ORDER_ALPHABETIC:
      if (action.payload === "Ascendente") {
        return {
          ...state,
          allGames: [
            ...state.allGames.sort((a, b) => a.name.localeCompare(b.name)), // String.prototype.localeCompare() que permite comprarar dos cadenas teniendo en cuenta acentos y otras características específicas de cada idioma para la ordenación. Lo mejor de todo, es que esta función devuelve -1, 1 o 0 según si es mayor, menor o igual,
          ],
        };
      } else {
        return {
          ...state,
          allGames: [
            ...state.allGames.sort((a, b) => b.name.localeCompare(a.name)),
          ],
        };
      }
    // Filtrar juegos por si es de la API o la DB
    case GET_GAMES_FROM_API_OR_DB:
      if (action.payload === "API") {
        return {
          ...state,
          ApiOrDb: "API",
          allGames: [
            ...state.allGamesToFilter.filter((game) => !isNaN(game.id)),
          ],
        };
      } else if (action.payload === "DB") {
        return {
          ...state,
          ApiOrDb: "DB",
          allGames: [
            ...state.allGamesToFilter.filter((game) => isNaN(game.id)),
          ],
        };
      } else {
        return {
          ...state,
          ApiOrDb: "",
          allGames: [...state.allGamesToFilter],
        };
      }

    default:
      return { ...state };
  }
};

export default reducer;
