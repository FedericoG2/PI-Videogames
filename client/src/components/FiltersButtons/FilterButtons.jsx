import React from "react";
import style from "./FilterButtons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
  getGamesFromApiOrDb,
  getGenresFiltered,
  getGamesOrderAlphabetic,
  getGamesOrderRating,
  getAllGames,
  getGenres,
} from "../../redux/actions";

function FilterButtons() {
  const location = useLocation();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // action para ordenar alfabeticamente
  const gamesOrderAlphabetic = (event) => {
    dispatch(getGamesOrderAlphabetic(event.target.value));
  };

  // action para filtrar por generos
  const filterByGenre = (event) => {
    dispatch(getGenresFiltered(event.target.value));
  };
  // functiones de api o db
  const filterByOrigin = (event) => {
    dispatch(getGamesFromApiOrDb(event.target.value));
  };
  // action para ordenar por rating
  const gameOrderRating = (event) => {
    dispatch(getGamesOrderRating(event.target.value));
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <select className={style.selects} onChange={filterByGenre}>
        <option select disabled selected={true}>
          Genres
        </option>
        {genres.map((genre) => {
          return (
            <option key={genre} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>
      <select className={style.selects} onChange={filterByOrigin}>
        <option select disabled selected={true}>
          Origin
        </option>
        <option value="ALL">All games</option>
        <option value="API">From API</option>
        <option value="DB">Created by user</option>
      </select>
      <select className={style.selects} onChange={gameOrderRating}>
        <option select disabled selected={true}>
          Rating
        </option>
        <option value="Ascendente">Bajo</option>
        <option value="Descendente">Alto</option>
      </select>
      <select className={style.selects} onChange={gamesOrderAlphabetic}>
        <option select disabled selected={true}>
          A/Z
        </option>
        <option value="Ascendente">A-Z</option>
        <option value="Descendente">Z-A</option>
      </select>

      <button onClick={() => dispatch(getAllGames())}>Reload</button>
      {
        // el boton create no se muestra en /form
        location.pathname !== "/form" && (
          <NavLink to="/form">
            <button>Create game</button>
          </NavLink>
        )
      }
    </div>
  );
}

export default FilterButtons;
