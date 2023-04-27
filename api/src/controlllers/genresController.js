const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

//-------------TRAE LOS GENEROS DE LA API,CREA UNA ENTRADA EN LA TABLA A MENOS QUE ENCUENTRE UNA QUE CUMPLA CON LA CONDICION DE CONSULTA, LOS ALMACENA EN LA BASE DE DATOS Y RETORNA//

const getGenresVg = async () => {
  let response = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  let genres = await response.data.results.map((g) => g.name);

  genres.forEach((e) => {
    Genre.findOrCreate({
      where: { name: e },
    });
  });

  const all = await Genre.findAll();
  return all;
};

module.exports = {
  getGenresVg,
};
