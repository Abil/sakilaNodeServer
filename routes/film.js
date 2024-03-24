import express from "express";

import { Language } from "../models/categoryxlanguage.js";
import Film from "../models/film.js";

const router = express.Router();

// Create a new film
router.post("/film", async (req, res) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json(film);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all films
router.get("/film", async (req, res) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Language,
        },
      ],
    });
    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get film by ID
router.get("/film/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.findByPk(filmId, {
      include: [
        {
          model: Language,
        },
      ],
    });
    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update film by ID
router.put("/film/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.findByPk(filmId);
    if (film) {
      await film.update(req.body);
      res.json({ message: "Film updated successfully" });
    } else {
      res.status(404).json({ error: "Film not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete film by ID
router.delete("/film/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.findByPk(filmId);
    if (film) {
      await film.destroy();
      res.json({ message: "Film deleted successfully" });
    } else {
      res.status(404).json({ error: "Film not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
