import Film from "../models/film.js";
import Language from "../models/language.js";
import Category from "../models/category.js";

// Get all films
export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll({
      include: [
        { model: Language, as: "language" },
        { model: Language, as: "original_language" },
      ],
    });
    res.json(films);
  } catch (error) {
    console.error("Error fetching films:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a film by ID
export const getFilmById = async (req, res) => {
  const { filmId } = req.params;
  try {
    const film = await Film.findByPk(filmId, {
      include: [
        { model: Language, as: "language" },
        { model: Language, as: "original_language" },
        //'as' (pointing to same alais used in association) this is done to avoid pluralisation of models associated through join tables (check Film and Category association through FilmCategory)
        {
          model: Category,
          as: "category",
          attributes: ["name"],
          //This is to avoid displaying attributes from the join table
          through: { attributes: [] },
        },
      ],
    });
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    res.json(film);
  } catch (error) {
    console.error("Error fetching film by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new film
export const createNewFilm = async (req, res) => {
  const {
    title,
    description,
    release_year,
    language_id,
    original_language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
  } = req.body;
  try {
    const newFilm = await Film.create({
      title,
      description,
      release_year,
      language_id,
      original_language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features,
    });
    res.status(201).json(newFilm);
  } catch (error) {
    console.error("Error creating film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing film
export const updateFilm = async (req, res) => {
  const { filmId } = req.params;
  const {
    title,
    description,
    release_year,
    language_id,
    original_language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
  } = req.body;
  try {
    const film = await Film.findByPk(filmId);
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    await film.update({
      title,
      description,
      release_year,
      language_id,
      original_language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features,
    });
    res.json(film);
  } catch (error) {
    console.error("Error updating film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an existing film
export const deleteFilm = async (req, res) => {
  const { filmId } = req.params;
  try {
    const film = await Film.findByPk(filmId);
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    await film.destroy();
    res.json({ message: "Film deleted successfully" });
  } catch (error) {
    console.error("Error deleting film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
