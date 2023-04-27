const {
  getVg,
  getVgById,
  createNewGame,
} = require("../controlllers/videogamesController");

//TODOS O POR SU NOMBRE
const getVideogames = async (req, res) => {
  const { name } = req.query;
  try {
    const games = await getVg(name);
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POR ID
const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params;
  const source = isNaN(idVideogame) ? "DB" : "API"; //Si da true es porque me envian un uuid
  try {
    const gamesById = await getVgById(idVideogame, source);
    res.status(200).json(gamesById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CREAR UN JUEGO
const postVideogame = async (req, res) => {
  const {
    name,
    description,
    rating,
    released,
    background_image,
    genre,
    platform,
  } = req.body;
  try {
    const newGame = await createNewGame({
      name,
      description,
      rating,
      released,
      background_image,
      genre,
      platform,
    });
    res.status(200).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  postVideogame,
};
