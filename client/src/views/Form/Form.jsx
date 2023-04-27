import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import style from "./Form.module.css";
import axios from "axios";

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
    background_image: "",
    genre: [],
    platform: [],
  });

  const [error, setError] = useState({
    name: "",

    rating: "",

    background_image: "",
  });
  const [genresSelected, setGenresSelected] = useState("Genres");
  const [platformsSelected, setPlatformsSelected] = useState("Platforms");
  //-------------------------------
  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
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
      const numberExpression = /^([0-9])*$/;

      if (regularExpression.test(value)) {
        error.name = "The name cannot containg special characters";
        setError(error);
      } else {
        error.name = "";
        setError(error);
      }
      if (value.length > 50) {
        error.name = "The name cannot contain more than 200 characters";
      }
      if (numberExpression.test(value)) {
        error.name = "The name cannot contain numbers";
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
    if (property === "background_image") {
      if (!validateUrl(value)) {
        error.image = "Needs to be a url";
      } else {
        error.image = "";
        setError(error);
      }
    }
  };
  //---------------------------------------------------------
  const handleSelectGenre = (e) => {
    setForm({
      ...form,
      genre: [...form.genre, e.target.value],
    });
    setGenresSelected(e.target.value);
  };
  const handleDeleteGenre = (e) => {
    const deleteGenre = form.genre.filter((genre) => genre !== e.target.value);
    setForm({
      ...form,
      genre: deleteGenre,
    });
    if (e.target.value === genresSelected) setGenresSelected("Genres");
  };

  const handleSelectPlatform = (e) => {
    setForm({
      ...form,
      platform: [...form.platform, e.target.value],
    });
    setPlatformsSelected(e.target.value);
  };
  const handleDeletePlatform = (e) => {
    const deletePlatform = form.platforms.filter((p) => p !== e.target.value);
    setForm({
      ...form,
      platform: deletePlatform,
    });
    if (e.target.value === platformsSelected) setGenresSelected("Genres");
  };

  //----------------------------------------------------------------------------PLATFORMS----------
  let platforms = [
    "PlayStation 5",
    "Xbox Series S/X",
    "PlayStation 4",
    "PC",
    "PlayStation 3",
    "Xbox 360",
    "Xbox One",
    "Nintendo Switch",
    "Linux",
    "macOS",
    "Android",
    "iOS",
    "PS Vita",
    "Xbox",
    "Web",
    "Wii U",
    "Nintendo 3DS",
    "PlayStation 2",
    "Dreamcast",
  ];
  //-----------------------------------------------------------------ENVIO DE FORMULARIO-------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => alert("Videogame created successfully!"))
      .catch((err) => alert(err));
    console.log("err");

    setForm({
      name: "",
      description: "",
      rating: "",
      released: "",
      background_image: "",
      genre: [],
      platform: [],
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
        {error.name && <p className={style.error}>{error.name}</p>}
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
        {error.rating && <p className={style.error}>{error.rating}</p>}
        <div>
          <label htmlFor="nombre">Description :</label>
          <textarea
            name="description"
            placeholder="..."
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {error.description && (
          <p className={style.error}>{error.description}</p>
        )}
        <div>
          <h4>Type URL *</h4>
          <label>Image :</label>
          <input
           
            type="url"
            name="image"
            value={form.background_image}
            onChange={handleChange}
          />
        </div>
        {/* {error.image && <p className={style.error}>{error.background_image}</p>} */}

        <div>
          <h4>At least one platform and genre is required *</h4>
          <label htmlFor="nombre">Choose Genres :</label>

          <select onChange={handleSelectGenre}>
            <option select disabled selected={true}>
              Genres
            </option>
            {genres.map((genre) => (
              <option key={genre.id}>{genre}</option>
            ))}
          </select>
          {error.genres && <p className={style.error}>{error.genres}</p>}
          <div className={style.boton}>
            <>
              {form.genre.map((genre) => (
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

        <div>
          <label>Choose Platforms :</label>
          <select onChange={handleSelectPlatform}>
            <option select disabled selected={true}>
              Platforms
            </option>
            {platforms.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </select>
          {error.platforms && <p className={style.error}>{error.platforms}</p>}
          <div className={style.boton}>
            <>
              {form.platform.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  value={p}
                  onClick={(e) => handleDeletePlatform(e)}
                >
                  {p} x
                </button>
              ))}
            </>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default Formulario;
