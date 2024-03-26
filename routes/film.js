import express from "express";

import {
  getAllFilms,
  getFilmById,
  createNewFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/film.js";

const router = express.Router();

// GET all films
router.get("/", getAllFilms);

// GET film by ID
router.get("/:filmId", getFilmById);

// POST create a new film
router.post("/", createNewFilm);

// PUT update an existing film
router.put("/:filmId", updateFilm);

// DELETE delete an existing film
router.delete("/:filmId", deleteFilm);

export default router;
