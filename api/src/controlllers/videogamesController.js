const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//------------------------------------------------------------------------TRAER TODOS LOS JUEGOS-----------------------------
const getAllVg = async () => {
  //-----------JUEGOS DE LA API-------------------------------------------------------------------

  const arrayGamesApi = [];
  for (let i = 1; i <= 7; i++) {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    // mapeo y pusheo cada juego
    response.data.results.map((game) => {
      arrayGamesApi.push({
        id: game.id,
        name: game.name,
        platform: game.platforms.map((e) => e.platform.name),
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((g) => g.name),
      });
    });
  }

  // Traigo los juegos de la db (incluyendo su relacion)
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // mapeo lo que llego de la db
  const arrayGamesDB = gamesDb.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      platform: game.platform,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    };
  });

  // Concateno lo de la db y la api
  return [...arrayGamesDB, ...arrayGamesApi];
};
//----------------------------------------------------------------------------------------------

//--------------------------------------------TRAER LOS JUEGOS POR SU NOMBRE---------------
const getVgByName = async (name) => {
  try {
    // DB
    const gamesDb = await Videogame.findAll({
      where: { name: name },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const arrayGamesDB = gamesDb.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platform: game.platform,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });
    // API
    let arrayGamesApi = [];
    for (let i = 1; i <= 2; i++) {
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=${i}`
      );
      response.data.results.map((game) => {
        arrayGamesApi.push({
          id: game.id,
          name: game.name,
          platform: game.platforms.map((e) => e.platform.name),
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
        });
      });
    }

    arrayGamesApi = arrayGamesApi.filter(
      (g) => g.name.toLowerCase() || g.name.toUpperCase()
    );

    let allGamesByName = [...arrayGamesDB, ...arrayGamesApi].slice(0, 15);
    return allGamesByName;
  } catch (error) {
    throw Error("El juego ingresado no existe");
  }
};

//-----------------------------------------------TRAER LOS JUEGOS POR ID----------------------// (Solo tiene description si se busca por ID!)

// De la API
const getVgAPI = async (id) => {
  const gamesAPI = [];

  const getByAPI = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  gamesAPI.push({
    id: getByAPI?.data.id,
    name: getByAPI?.data.name,
    description: getByAPI?.data.description,
    platform: getByAPI?.data.platforms.map((e) => e.platform.name),
    background_image: getByAPI?.data.background_image,
    released: getByAPI?.data.released,
    rating: getByAPI?.data.rating,
    genres: getByAPI?.data.genres.map((g) => g.name),
  });

  return gamesAPI;
};

// De la DB
const getVgDB = async (id) => {
  let gamesDB = [];

  const getGamesDB = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  gamesDB.push({
    id: getGamesDB.id,
    name: getGamesDB.name,
    description: getGamesDB.description,
    platform: getGamesDB.platform,
    background_image: getGamesDB.background_image,
    released: getGamesDB.released,
    rating: getGamesDB.rating,
    genres: getGamesDB.genres.map((genre) => genre.name),
  });
  return gamesDB;
};

//------------------------------------------------------------CREAR UN JUEGO-------------------------------------------------------
const createNewGame = async ({
  name,
  description,
  rating,
  released,
  background_image,
  genre,
  platform,
}) => {
  //Verificar que todos los campos estan llenos
  if (
    !name ||
    !description ||
    !rating ||
    !released ||
    !background_image ||
    !genre ||
    !platform
  ) {
    throw Error("Todos los campos son obligatorios");
  }
  //Verificar si el juego ya existe
  const searchName = await Videogame.findAll({
    where: { name: name },
  });
  // Lanzar error en caso de que ya exista
  if (searchName.length !== 0) throw Error("Este juego ya existe!");

  // busca y trae de la tabla genre los generos = genre
  let getGenreDB = await Genre.findAll({
    where: {
      name: genre,
    },
  });

  //Guerdar nuevo juego en la DB
  let newVideogame = await Videogame.create({
    name: name,
    description: description,
    rating: rating,
    released: released,
    background_image: background_image,

    platform: platform,
  });

  await newVideogame.addGenres(getGenreDB);

  return newVideogame;
};
//me parece que aca falta algo ojota rey
//-----------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------TODOS LOS JUEGOS O POR NOMBRE(query)------------------
const getVg = (name) => {
  if (!name) return getAllVg(); //Todos los juegos
  else return getVgByName(name); //Juegos por nombre
};

// -------------------------------------------------------------------JUEGOS POR ID(depende del tipo de id)-----------------------------
const getVgById = async (id, source) => {
  if (source === "API") return getVgAPI(id);
  else return getVgDB(id);
};

module.exports = {
  getVg,
  getVgById,

  createNewGame,
};
