import FilterButtons from "../../components/FiltersButtons/FilterButtons";
import style from "./Home.module.css";
import Cards from "../../components/Cards/Cards";

const Home = (props) => {
  return (
    <div className={style.container}>
      <FilterButtons />
      <Cards />
    </div>
  );
};

export default Home;
