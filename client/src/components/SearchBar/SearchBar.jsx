import React from "react";
import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../../redux/actions";

function SearchBar() {
 
  const dispatch = useDispatch();
  const [game, setGame] = useState("");

  const onChangeHandler = (event) => {
    setGame(event.target.value);
  };

  const functions = () => {
    dispatch(getGameByName(game));
    setGame("");
  };
  return (
    <div className={style.container}>
      <input
        autoComplete="off"
        className={style.input}
        type="search"
        placeholder="Search..."
        name="name"
        value={game}
        onChange={onChangeHandler}
      />
      <button onClick={() => functions()} className={style.buttons}>
        +
      </button>
    </div>
  );
}

export default SearchBar;
