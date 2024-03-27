import express from "express";
import { isAdmin } from "../middlewares/auth.js";

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
router.post("/", isAdmin, createNewFilm);

// PUT update an existing film
router.put("/:filmId", isAdmin, updateFilm);

// DELETE delete an existing film
router.delete("/:filmId", isAdmin, deleteFilm);

export default router;
