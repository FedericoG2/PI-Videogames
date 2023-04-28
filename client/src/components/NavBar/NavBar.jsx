import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  return (
    <div>
      <nav className={style.navBar}>
        <div className={style.container}>
          <NavLink className={style.home} to="/home">
            HOME
          </NavLink>
        </div>
      </nav>
      {location.pathname !== "/form" &&
        !location.pathname.includes("/detail") && (
          <div className={style.titulo}>
            <SearchBar />
          </div>
        )}
    </div>
  );
}
