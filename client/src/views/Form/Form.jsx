import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres,postVideogame } from "../../redux/actions";
import style from "./Form.module.css";

const Formulario = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);

  //----------------------------------------------------------------------------ESTADOS----------------------------------
  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: "",
    released: "",
    image: "",
    genres: [],
    platforms: [],
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    rating: "",
    platforms: "",
  });
  const [genresSelected, setGenresSelected] = useState("Genres");

  // ------------------------------------------------------------------HANDLERS---------------------------------------------------
  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [property]: value,
    });
    if (property === "name") {
      const regularExpression = /[`@#$%^&*()_+\-=[\]{};'"\\|<>/~]/;
      if (regularExpression.test(value)) {
        error.name = "The name cannot containg special characters";
        setError(error);
      } else {
        error.name = "";
        setError(error);
      }
      if (value.length > 50) {
        error.name = "the name cannot contain more than 200 characters";
      }
    }
    if (property === "rating") {
      if (value < 1 || value > 5) {
        error.rating = "The rating needs to be between 1 and 5";
        setError(error);
      } else {
        error.rating = "";
        setError(error);
      }
    }
  };

  const handleSelectGenre = (e) => {
    setForm({
      ...form,
      genres: [...form.genres, e.target.value],
    });
    setGenresSelected(e.target.value);
  };
  const handleDeleteGenre = (e) => {
    const deleteGenre = form.genres.filter((genre) => genre !== e.target.value);
    setForm({
      ...form,
      genres: deleteGenre,
    });
    if (e.target.value === genresSelected) setGenresSelected("Genres");
  };
  //-----------------------------------------------------------------ENVIO DE FORMULARIO-------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) {
      return alert("Name is required");
    } else if (!form.description) {
      return alert("Description is required");
    } else if (!form.release) {
      return alert("Release date is required");
    } else if (!form.rating || form.rating < 1 || form.rating > 5) {
      return alert("Enter a rating between 1 and 5");
    } else if (!form.platforms.length) {
      return alert("At least one platform is required");
    } else if (!form.genres.length) {
      return alert("At least one genre is required");
    }

    dispatch(postVideogame(form));

    alert("Videogame created successfully!");

    setForm({
      name: "",
      description: "",
      rating: "",
      released: "",
      image: "",
      genres: [],
      platforms: [],
    });
  };

  //-----------------------------------------------------------------------------------
  return (
    <>
      <form onSubmit={handleSubmit} className={style.formulario}>
        <div>
          <label htmlFor="nombre">Name :</label>
          <input
            type="text"
            name="name"
            placeholder="..."
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="correo">Released :</label>
          <input
            type="date"
            name="released"
            value={form.released}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nombre">Rating :</label>
          <input
            type="rating"
            name="rating"
            placeholder="..."
            value={form.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nombre">Description :</label>
          <textarea
            name="description"
            placeholder="..."
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        //---------------------------------------------------------------------------GENRE---------------------------------------
        <div>
          <label htmlFor="nombre">Choose Genres :</label>
          <select onChange={handleSelectGenre}>
            <option select disabled selected={true}>
              Genres
            </option>
            {genres.map((genre) => (
              <option key={genre.id} isabled={form.genres.includes(genre.name)}>
                {genre}
              </option>
            ))}
          </select>
          <div className={style.boton}>
            <>
              {form.genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  value={genre}
                  onClick={(e) => handleDeleteGenre(e)}
                >
                  {genre} x
                </button>
              ))}
            </>
          </div>
        </div>
        //----------------------------------------------------PLATFORMS----------------------------------------------------
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default Formulario;
