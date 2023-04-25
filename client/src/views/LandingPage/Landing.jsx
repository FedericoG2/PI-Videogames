import React from "react";

import style from "./Landing.module.css";
import { useHistory } from "react-router-dom";

function Landing() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/home");
  };
  return (
    <>
      <div className={style.background}>
        <div className={style.container}>
          <h2 className={style.textGamegeist}>PI-Videogames</h2>
          <div className={style.button}>
            <button className={style.letsPlay} onClick={handleClick}>
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
