import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ id, image, name, genres, rating }) {
  return (
    <NavLink to={`/detail/${id}`}>
      <div className={style.celda}>
        <div className={style.img}>
          <img className={style.img} src={image} alt="img not found" />
        </div>
        <div className={style.box}>
          <div className={style.info}>
            <h4>{name}</h4>
            <p>{genres.join(" - ")} </p>
          </div>
          <div className={style.rating}>
            <h4>⭐️ {rating}</h4>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
