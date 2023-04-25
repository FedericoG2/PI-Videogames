import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameById } from "../../redux/actions";
import style from "./Detail.module.css";
import { NavLink } from "react-router-dom";

const Detail = () => {
  const { idVideogame } = useParams();
  const dispatch = useDispatch();

  // cada vez que el id cambie se cambia el estado global de detail
  useEffect(() => {
    dispatch(getGameById(idVideogame));
  }, [idVideogame]);
  const gameDetail = useSelector((state) => state.gameDetail);

  return (
    <div className={style.container}>
      <div className={style.containerDetail}>
        {gameDetail.map((game) => {
          return (
            gameDetail[0].id == idVideogame && (
              <div className={style.detail}>
                <div className={style.imagen}>
                  <img
                    className={style.image}
                    src={game.background_image}
                    alt={game.name}
                  />
                </div>
                <div className={style.informacion}>
                  <h3 className={style.name}>{game.name}</h3>
                  {game.description ? (
                    <p
                      className={style.info}
                      dangerouslySetInnerHTML={{ __html: game.description }}
                    ></p>
                  ) : (
                    <p>"Game detail not found in database"</p>
                  )}
                  <p className={style.info}>
                    Platforms:
                    {game.platform.map((plataforma) => {
                      return <span>{plataforma}/ </span>;
                    })}
                  </p>
                  <p className={style.info}>
                    Genres:
                    {game.genres.map((genre) => {
                      return <span>{genre}/</span>;
                    })}
                  </p>
                  <p className={style.info}>Released: {game.released}</p>
                  <p className={style.info}>Rating: {game.rating}</p>
                  <NavLink to="/home">
                    <button className={style.boton}>Home</button>
                  </NavLink>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
