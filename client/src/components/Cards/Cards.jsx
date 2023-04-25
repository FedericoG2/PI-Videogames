import React from "react";
import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
function Cards() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {currentGames.map((game, index) => {
        return (
          <div key={index}>
            <Card
              id={game.id}
              name={game.name}
              image={game.background_image}
              genres={game.genres}
              rating={game.rating}
            />
          </div>
        );
      })}
      <Pagination
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Cards;
